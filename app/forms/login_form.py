from flask_wtf import FlaskForm
from wtforms import StringField
from wtforms.validators import DataRequired, Email, ValidationError
from app.models import User


def user_exists(form, field):
    # Checking if user exists
    password = form.data['password']
    email = field.data
    user = User.query.filter(User.email == email).first()
    if len(password) < 1:
        pass
    else:
        if "@" not in email or "." not in email:
            raise ValidationError('Please enter a valid email address.')
        if not user or not user.check_password(password):
            raise ValidationError('Email address or password is incorrect.')


# def password_matches(form, field):
#     # Checking if password matches
#     password = field.data
#     email = form.data['email']
#     user = User.query.filter(User.email == email).first()
#     if len(password) < 1:
#         pass
#     else:
#         if not user:
#             raise ValidationError('No such user exists.')
#         if not user.check_password(password):
#             raise ValidationError('Password was incorrect.')


class LoginForm(FlaskForm):
    email = StringField('email', validators=[DataRequired('Please enter your email address'), user_exists])
    password = StringField('password', validators=[
                           DataRequired('Please enter your password')])