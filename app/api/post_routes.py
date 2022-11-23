from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from app.models import db, User, Post
from app.forms import PostForm

post_routes = Blueprint('posts', __name__)


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
    # if request.method == 'POST':
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
        return {'post': new_post.to_dict()}

@post_routes.route('/<int:id>', methods=['PUT'])
@login_required
def edit_post(id):
    """
    Query for existing post, then edit by logged in User, returning newest post entry as a dictionary
    """
    post = Post.query.get(id)
    if post:
        if post.user_id == current_user.id:
            if request.json['post_body']:
                post.post_body = request.json['post_body']
            if request.json['images']:
                post.images = request.json['images']

            db.session.commit()

            return {'post': post.to_dict()}
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
