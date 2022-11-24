from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from app.models import db, User, Post, Comment
from app.forms import PostForm
from datetime import datetime

comment_routes = Blueprint('comments', __name__)


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
    if edit_comment:
        if edit_comment.user_id == current_user.id:
            edit_comment.updated_on = datetime.utcnow()
            if request.json['comment']:
                edit_comment.comment = request.json['comment']

            db.session.commit()

            return {'comment': edit_comment.to_dict()}
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
