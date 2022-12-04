from .db import db, environment, SCHEMA, add_prefix_for_prod
from werkzeug.security import generate_password_hash, check_password_hash
from flask_login import UserMixin


class User(db.Model, UserMixin):
    __tablename__ = 'users'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    first_name = db.Column(db.String(40), nullable=False)
    last_name = db.Column(db.String(40), nullable=False)
    profile_image = db.Column(db.String)
    description = db.Column(db.String)
    education = db.Column(db.String)
    location = db.Column(db.String)
    employment = db.Column(db.String)
    connections = db.Column(db.String)
    email = db.Column(db.String(255), nullable=False, unique=True)
    hashed_password = db.Column(db.String(255), nullable=False)

    comments = db.relationship("Comment", back_populates="user", cascade="all, delete")
    posts = db.relationship("Post", back_populates="user", cascade="all, delete")
    likes = db.relationship("Like", back_populates="user", cascade="all, delete")

    @property
    def password(self):
        return self.hashed_password

    @password.setter
    def password(self, password):
        self.hashed_password = generate_password_hash(password)

    def check_password(self, password):
        return check_password_hash(self.password, password)

    def to_dict(self, activity=False):
        user =  {
            'id': self.id,
            'first_name': self.first_name,
            'last_name': self.last_name,
            'email': self.email,
            'profile_image': self.profile_image,
            'description': self.description,
            'education': self.education,
            'location': self.location,
            'employment': self.employment
        }
        if(activity):
            user['activity'] = {
                "comments": [comment.to_dict() for comment in self.comments],
                "post": [post.to_dict() for post in self.posts],
                "likes": [like.to_dict() for like in self.likes]
            }
        return user
