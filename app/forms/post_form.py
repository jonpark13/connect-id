from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField, TextField
from wtforms.validators import DataRequired

class PostForm(FlaskForm):
    post_body = TextField("Post", validators=[DataRequired()])
    images = TextField("images")
    user_id = IntegerField('user id', validators=[DataRequired()])
