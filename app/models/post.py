from .db import db, environment, SCHEMA, add_prefix_for_prod

class Post(db.Model):
    __tablename__ = 'posts'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("users.id")))
    post_body = db.Column(db.Text)
    images = db.Column(db.Text)
    created_on = db.Column(db.DateTime, server_default=db.func.now())
    updated_on = db.Column(db.DateTime, server_default=db.func.now(), server_onupdate=db.func.now())

    user = db.relationship("User", back_populates="posts")
    comments = db.relationship("Comment", back_populates="post")
    likes = db.relationship("Like", back_populates="post")

    def to_dict(self, comments=False, likes=False):
        post = {
            'id': self.id,
            'user_id': self.user_id,
            'post_body': self.post_body,
            'created_on': self.created_on
        }
        if(comments):
            post['comments'] = [comment.to_dict() for comment in self.comments]
        if(likes):
            post['likes']= [like.to_dict() for like in self.likes]

        return post
