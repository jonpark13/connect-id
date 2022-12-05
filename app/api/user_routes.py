from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from app.models import db,User
from app.forms import UserUpdateForm
from app.s3 import (
    upload_file_to_s3, allowed_file, get_unique_filename)

user_routes = Blueprint('users', __name__)

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

@user_routes.route('/')
@login_required
def users():
    """
    Query for all users and returns them in a list of user dictionaries
    """
    users = User.query.all()
    return {'users': [user.to_dict() for user in users]}


@user_routes.route('/<int:id>')
@login_required
def user(id):
    """
    Query for a user by id and returns that user in a dictionary
    """
    user = User.query.get(id)
    return user.to_dict(activity=True)

@user_routes.route('/<int:id>', methods=['PUT'])
@login_required
def edit_user_info(id):
    """
    Query for existing user by id, then edit by logged in User, returning newest user information entry as a dictionary
    """
    user = User.query.get(id)
    if user:
        if user.id == current_user.id:
            form = UserUpdateForm(obj=user)
            form['csrf_token'].data = request.cookies['csrf_token']
            if form.validate_on_submit():
                form.populate_obj(user)
                db.session.commit()
                return user.to_dict()
            else:
                return validation_errors_to_error_messages(form.errors), 401
        else:
            return {"message": "Current user does not own this post"}
    else:
        return {"message": f"The User at id:{id} does not exist "}

@user_routes.route('/images', methods=['POST'])
@login_required
def post_images():
    """
    Route for uploading images for post from logged in User
    """
    if request.files:
        for x in request.files.getlist('image'):
            if not allowed_file(x.filename):
                return {"errors": "File(s) type not permitted"}, 400
            x.filename = get_unique_filename(x.filename)

            upload = upload_file_to_s3(x)

            if "url" not in upload:
            # if the dictionary doesn't have a url key
            # it means that there was an error when we tried to upload
            # so we send back that error message
                return upload, 400
            
            url = upload["url"]
            
        # return {"images": "[" + ", ".join(new_list) + "]"}
        return {"image": url}
    else:
        return {"image": ''}