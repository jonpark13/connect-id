from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField, TextField
from wtforms.validators import DataRequired

class LikeForm(FlaskForm):
    type = StringField("type", validators=[DataRequired()])
    user_id = IntegerField('user id', validators=[DataRequired()])
    post_id = IntegerField('post id', validators=[DataRequired()])
