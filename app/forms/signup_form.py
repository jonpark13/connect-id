from flask_wtf import FlaskForm
from wtforms import StringField
from wtforms.validators import DataRequired, Email, ValidationError, Length
from app.models import User


def user_exists(form, field):
    # Checking if user exists
    email = field.data
    user = User.query.filter(User.email == email).first()
    if user:
        raise ValidationError('Email address is already in use.')

def email_check(form, field):
    # Checking if email is valid
    email = field.data
    if "@" not in email or "." not in email:
        raise ValidationError('Email address is not valid.')

# def username_exists(form, field):
#     # Checking if username is already in use
#     username = field.data
#     user = User.query.filter(User.username == username).first()
#     if user:
#         raise ValidationError('Username is already in use.')


class SignUpForm(FlaskForm):
    first_name = StringField('first_name', validators=[DataRequired("Please enter your first name"),Length(min=1, max=30,message='Your first name cannot be longer than 30 characters')])
    last_name = StringField('last_name', validators=[DataRequired("Please enter your last name"),Length(min=1, max=30,message='Your first name cannot be longer than 30 characters')])
    email = StringField('email', validators=[DataRequired("Please enter a valid email address"), user_exists, email_check,Length(max=50,message='Your email cannot be longer than 50 characters')])
    password = StringField('password', validators=[DataRequired("Please enter your password"),Length(min=5, max=50,message='Your password must be between 5 and 50 characters')])