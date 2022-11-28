from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from app.models import db, User, Like
from app.forms import PostForm
from datetime import datetime

like_routes = Blueprint('likes', __name__)


@like_routes.route('/')
def likes():
    """
    Query for all likes and returns them in a list of dictionaries, 
    """
    likes = Like.query.all()
    return {'likes': [like.to_dict() for like in likes]}

@like_routes.route('/<int:id>', methods=['PUT'])
@login_required
def edit_like(id):
    """
    Query for existing like, then edit by logged in User, returning newest post entry as a dictionary
    """
    edit_like = Like.query.get(id)
    if edit_like:
        if edit_like.user_id == current_user.id:
            edit_like.updated_on = datetime.utcnow()
            if request.json['type']:
                edit_like.type = request.json['type']

            db.session.commit()

            return {'tyype': edit_like.to_dict()}
        else:
            return {"message": "Current user does not own this like"}
    else:
        return {"message": f"The Like at id:{id} does not exist "}

@like_routes.route('/<int:id>', methods=['DELETE'])
@login_required
def delete_like(id):
    """
    Query for existing like, then delete by logged in User, returning the status message
    """
    del_like = Like.query.get(id)
    if del_like:
        if del_like.user_id == current_user.id:
            db.session.delete(del_like)
            db.session.commit()

            return {'message': "Like was successfully deleted"}
        else:
            return {"message": "Current user does not own this like"}
    else:
        return {"message": f"The Like at id:{id} does not exist "}