from flask import Blueprint, jsonify
from flask_login import login_required
from app.models import User, Post

post_routes = Blueprint('posts', __name__)


@post_routes.route('/')
def users():
    """
    Query for all users and returns them in a list of user dictionaries
    """
    posts = Post.query.all()
    return {'posts': [post.to_dict(comments=True,likes=True) for post in posts]}
