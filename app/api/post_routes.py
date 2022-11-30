from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from app.models import db, User, Post, Comment, Like
from app.forms import PostForm, CommentForm, LikeForm
from datetime import datetime
from app.s3 import (
    upload_file_to_s3, allowed_file, get_unique_filename)

post_routes = Blueprint('posts', __name__)

def validation_errors_to_error_messages(validation_errors):
    """
    Simple function that turns the WTForms validation errors into a simple list
    """
    errorMessages = {}
    for field in validation_errors:
        for error in validation_errors[field]:
            print(errorMessages)
            errorMessages[field] = error
    return errorMessages

@post_routes.route('/')
def posts():
    """
    Query for all posts and returns them in a list of user dictionaries, including their respective
    comments and likes
    """
    posts = Post.query.all()
    return {'posts': [post.to_dict(comments=True,likes=True) for post in posts]}

@post_routes.route('/', methods=['POST'])
@login_required
def add_post():
    """
    Add a new post by logged in User, returning newest post entry as a dictionary
    """
    form = PostForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        new_post = Post(
            post_body = form.data["post_body"],
            user_id = form.data["user_id"],
            images = form.data["images"]
        )
        db.session.add(new_post)
        db.session.commit()
        return new_post.to_dict(comments=True, likes=True)

@post_routes.route('/images', methods=['POST'])
@login_required
def post_images():
    """
    Route for uploading images for post from logged in User
    """
    new_list = []
    if request.files:
        for x in request.files.getlist('image'):
            if not allowed_file(x.filename):
                return {"errors": "file type not permitted"}, 400
            x.filename = get_unique_filename(x.filename)

            upload = upload_file_to_s3(x)

            if "url" not in upload:
            # if the dictionary doesn't have a url key
            # it means that there was an error when we tried to upload
            # so we send back that error message
                return upload, 400
            
            url = upload["url"]
            new_list.append(url)
            
        # return {"images": "[" + ", ".join(new_list) + "]"}
        return {"images": "[" + ", ".join(new_list) + "]"}
    else:
        return {"images": ''}

@post_routes.route('/<int:id>/comments', methods=['POST'])
@login_required
def add_comment(id):
    """
    Add a new comment to existing post by logged in User, returning newest post entry as a dictionary
    """
    post = Post.query.get(id)
    if post:
        form = CommentForm()
        form['csrf_token'].data = request.cookies['csrf_token']
        if form.validate_on_submit():
            new_comment = Comment(
                comment = form.data["comment"],
                user_id = current_user.id,
                post_id = id
            )
            db.session.add(new_comment)
            db.session.commit()
            return new_comment.to_dict()
        else:
            return {'errors': validation_errors_to_error_messages(form.errors)}, 401
    else:
        return {"message": f"The Post at id:{id} does not exist "}


@post_routes.route('/<int:id>/likes', methods=['POST'])
@login_required
def add_like(id):
    """
    Add a like to existing post by logged in User, returning newest post entry as a dictionary
    """
    post = Post.query.get(id)
    liked_posts = Like.query.filter(Like.user_id == current_user.id).filter(Like.post_id == id).all()
    if len(liked_posts):
        return {"message": "This post is already liked by you"}
    if post:
        form = LikeForm()
        form['csrf_token'].data = request.cookies['csrf_token']
        if form.validate_on_submit():
            new_like = Like(
                type = form.data["type"],
                user_id = current_user.id,
                post_id = id
            )
            db.session.add(new_like)
            db.session.commit()
            return new_like.to_dict()
        else:
            return {"message": "Error"}
    else:
        return {"message": f"The Post at id:{id} does not exist "}

@post_routes.route('/<int:id>', methods=['PUT'])
@login_required
def edit_post(id):
    """
    Query for existing post, then edit by logged in User, returning newest post entry as a dictionary
    """
    post = Post.query.get(id)
    if post:
        if post.user_id == current_user.id:
            post.updated_on = datetime.utcnow()
            if request.json['post_body']:
                post.post_body = request.json['post_body']
            if request.json['images']:
                post.images = "[" + ", ".join(request.json['images']) + "]"

            db.session.commit()

            return post.to_dict()
        else:
            return {"message": "Current user does not own this post"}
    else:
        return {"message": f"The Post at id:{id} does not exist "}

@post_routes.route('/<int:id>', methods=['DELETE'])
@login_required
def delete_post(id):
    """
    Query for existing post, then delete by logged in User, returning the status message
    """
    post = Post.query.get(id)
    if post:
        if post.user_id == current_user.id:
            db.session.delete(post)
            db.session.commit()

            return {'message': "Post was successfully deleted"}
        else:
            return {"message": "Current user does not own this post"}
    else:
        return {"message": f"The Post at id:{id} does not exist "}

@post_routes.route('/current')
def current_users_posts():
    """
    Query for all posts by logged in user and returns them in a list of user dictionaries, including their respective
    comments and likes
    """
    user_posts = Post.query.filter(Post.user_id == current_user.id).all()
    return {'posts': [post.to_dict(comments=True,likes=True) for post in user_posts]}
