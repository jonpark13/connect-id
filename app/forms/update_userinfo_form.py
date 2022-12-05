from flask_wtf import FlaskForm
from wtforms import StringField
from wtforms.validators import Length


class UserUpdateForm(FlaskForm):
    description = StringField('description', validators=[Length(max=250,message='Your descripition cannot be over 250 characters')])
    education = StringField('education', validators=[Length(max=250,message='You input has exceeded the current limit, please edit another time')])
    location = StringField('location', validators=[Length(max=50,message='Your location cannot be over 50 characters.')])
    employment = StringField('employment', validators=[Length(max=250,message='You input has exceeded the current limit, please edit another time')])
    profile_image = StringField('profile_image',  validators=[Length(max=250,message='Image URL is too long')])