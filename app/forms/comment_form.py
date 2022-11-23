from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField, TextField
from wtforms.validators import DataRequired

class CommentForm(FlaskForm):
    comment = StringField("Comment", validators=[DataRequired()])
    user_id = IntegerField('user id', validators=[DataRequired()])
