from app.models import db, User, Post, Comment, environment, SCHEMA


# Adds a demo user, you can add other users here if you want
def seed_comments():
    comment1 = Comment(
        user_id = 1,
        post_id = 2,
        comment = "great post!"

    )
    comment2 = Comment(
        user_id = 1,
        post_id = 3,
        comment = "inspirational!",
    )
    comment3 = Comment(
        user_id = 2,
        post_id = 1,
        comment = "I agree"
    )
    comment4 = Comment(
        user_id = 2,
        post_id = 3,
        comment = "mhm"
    )
    comment5 = Comment(
        user_id = 2,
        post_id = 1,
        comment = "I'll see you around!"
    )
    comment6 = Comment(
        user_id = 4,
        post_id = 6,
        comment = "We're thrilled to be on this journey with you!"
    )
    comment7 = Comment(
        user_id = 5,
        post_id = 6,
        comment = "Welcome aboard!"
    )
    comment8 = Comment(
        user_id = 1,
        post_id = 4,
        comment = "lorem ipsum"
    )
    comment9 = Comment(
        user_id = 2,
        post_id = 4,
        comment = "awesome"
    )
    comment1 = Comment(
        user_id = 3,
        post_id = 4,
        comment = "great post!"
    )
    comment2 = Comment(
        user_id = 4,
        post_id = 4,
        comment = "inspirational!",
    )
    comment3 = Comment(
        user_id = 5,
        post_id = 4,
        comment = "I agree"
    )
    comment8 = Comment(
        user_id = 6,
        post_id = 4,
        comment = "lorem ipsum"
    )
    comment9 = Comment(
        user_id = 7,
        post_id = 7,
        comment = "awesome"
    )
    comment1 = Comment(
        user_id = 8,
        post_id = 8,
        comment = "great post!"
    )
    comment2 = Comment(
        user_id = 9,
        post_id = 9,
        comment = "inspirational!",
    )
    comment3 = Comment(
        user_id = 10,
        post_id = 10,
        comment = "I agree"
    )

    db.session.add(comment1)
    db.session.add(comment2)
    db.session.add(comment3)
    db.session.add(comment4)
    db.session.add(comment5)
    db.session.add(comment6)
    db.session.add(comment7)
    db.session.add(comment8)
    db.session.add(comment9)

    db.session.commit()


# Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_comments():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.comments RESTART IDENTITY CASCADE;")
    else:
        db.session.execute("DELETE FROM comments")
        
    db.session.commit()