from app.models import db, User, Post, environment, SCHEMA


# Adds a demo user, you can add other users here if you want
def seed_posts():
    post1 = Post(
        user_id = 1,
        post_body = "testing post 1",
        images = "https://i.imgur.com/SGZVyKe.jpeg",
        # comments = ,
        # likes = ,
    )
    post2 = Post(
        user_id = 2,
        post_body = "testing post 2",
        images = "",
        # comments = ,
        # likes = ,
    )
    post3 = Post(
        user_id = 3,
        post_body = "testing post 3",
        images = "https://i.imgur.com/rkVF20T.png",
        # comments = ,
        # likes = ,
    )

    db.session.add(post1)
    db.session.add(post2)
    db.session.add(post3)

    db.session.commit()


# Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_posts():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.posts RESTART IDENTITY CASCADE;")
    else:
        db.session.execute("DELETE FROM posts")
        
    db.session.commit()