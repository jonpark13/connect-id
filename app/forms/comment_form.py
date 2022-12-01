from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField, TextField
from wtforms.validators import DataRequired, Length

class CommentForm(FlaskForm):
    comment = StringField("comment", validators=[DataRequired(), Length(min=1, message="Comments cannot be empty"),Length(max=250, message="Comments must be between 1 and 250 characters long")])
    user_id = IntegerField('user id', validators=[DataRequired()])
    post_id = IntegerField('post id', validators=[DataRequired()])
