from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField, TextField
from wtforms.validators import DataRequired, Length

class PostForm(FlaskForm):
    post_body = TextField("Post", validators=[DataRequired(),Length(min=1, max=500)])
    images = TextField("images")
    user_id = IntegerField('user id', validators=[DataRequired()])
