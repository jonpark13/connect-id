from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from app.models import db, User, Post, Comment
from app.forms import PostForm, CommentForm
from datetime import datetime

comment_routes = Blueprint('comments', __name__)

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

@comment_routes.route('/')
def comments():
    """
    Query for all comments and returns them in a list of dictionaries
    """
    comments = Comment.query.all()
    return {'comments': [comment.to_dict() for comment in comments]}

# @post_routes.route('/', methods=['POST'])
# @login_required
# def add_post():
#     """
#     Add a new post by logged in User, returning newest post entry as a dictionary
#     """
#     # if request.method == 'POST':
#     form = PostForm()
#     form['csrf_token'].data = request.cookies['csrf_token']
#     if form.validate_on_submit():
#         new_post = Post(
#             post_body = form.data["post_body"],
#             user_id = form.data["user_id"],
#             images = form.data["images"]
#         )
#         db.session.add(new_post)
#         db.session.commit()
#         return {'post': new_post.to_dict()}

@comment_routes.route('/<int:id>', methods=['PUT'])
@login_required
def edit_comment(id):
    """
    Query for existing comment, then edit by logged in User, returning newest post entry as a dictionary
    """
    edit_comment = Comment.query.get(id)
    print(request.json, "REQUESTJSON")
    if edit_comment:
        if edit_comment.user_id == current_user.id:
            form = CommentForm(obj=edit_comment)
            form['csrf_token'].data = request.cookies['csrf_token']
            if form.validate_on_submit():
                form.populate_obj(edit_comment)
                # edit_comment.comment = form.data["comment"],
                    # user_id = form.data["user.id"],
                    # post_id = form.data["post.id"]
                print(edit_comment.to_dict(), "AFTEREDIT")
                db.session.commit()
                return edit_comment.to_dict()
            else:
                return validation_errors_to_error_messages(form.errors), 401
            # if request.json['comment']:
            #     edit_comment.comment = request.json['comment']

            #     db.session.commit()

            #     return edit_comment.to_dict()
            # else:
            #     return {"message": "Comment cannot be empty"}
        else:
            return {"message": "Current user does not own this comment"}
    else:
        return {"message": f"The Comment at id:{id} does not exist "}

@comment_routes.route('/<int:id>', methods=['DELETE'])
@login_required
def delete_comment(id):
    """
    Query for existing comment, then delete by logged in User, returning the status message
    """
    del_comment = Comment.query.get(id)
    if del_comment:
        if del_comment.user_id == current_user.id:
            db.session.delete(del_comment)
            db.session.commit()

            return {'message': "Comment was successfully deleted"}
        else:
            return {"message": "Current user does not own this comment"}
    else:
        return {"message": f"The Comment at id:{id} does not exist "}

# @post_routes.route('/current')
# def current_users_posts():
#     """
#     Query for all posts by logged in user and returns them in a list of user dictionaries, including their respective
#     comments and likes
#     """
#     user_posts = Post.query.filter(Post.user_id == current_user.id).all()
#     return {'posts': [post.to_dict(comments=True,likes=True) for post in user_posts]}
