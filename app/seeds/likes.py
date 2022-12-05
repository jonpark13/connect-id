from app.models import db, User, Like, environment, SCHEMA


# Adds a demo user, you can add other users here if you want
def seed_likes():
    like1 = Like(
        user_id = 1,
        post_id = 3,
        type = "thumbsup"
    )
    like2 = Like(
        user_id = 1,
        post_id = 2,
        type = "thumbsup",
    )
    like3 = Like(
        user_id = 2,
        post_id = 2,
        type = "thumbsup"
    )
    like4 = Like(
        user_id = 2,
        post_id = 1,
        type = "thumbsup"
    )
    like5 = Like(
        user_id = 2,
        post_id = 2,
        type = "thumbsup"
    )
    like6 = Like(
        user_id = 3,
        post_id = 1,
        type = "thumbsup"
    )
    like7 = Like(
        user_id = 1,
        post_id = 5,
        type = "thumbsup"
    )
    like8 = Like(
        user_id = 2,
        post_id = 5,
        type = "thumbsup"
    )
    like9 = Like(
        user_id = 3,
        post_id = 5,
        type = "thumbsup"
    )
    like10 = Like(
        user_id = 4,
        post_id = 5,
        type = "thumbsup"
    )
    like11 = Like(
        user_id = 4,
        post_id = 6,
        type = "thumbsup"
    )
    like12 = Like(
        user_id = 5,
        post_id = 7,
        type = "thumbsup"
    )
    like13 = Like(
        user_id = 6,
        post_id = 7,
        type = "thumbsup"
    )
    like14 = Like(
        user_id = 6,
        post_id = 8,
        type = "thumbsup"
    )
    like15 = Like(
        user_id = 7,
        post_id = 8,
        type = "thumbsup"
    )
    like16 = Like(
        user_id = 7,
        post_id = 9,
        type = "thumbsup"
    )
    like17 = Like(
        user_id = 8,
        post_id = 9,
        type = "thumbsup"
    )
    like18 = Like(
        user_id = 8,
        post_id = 10,
        type = "thumbsup"
    )
    like19 = Like(
        user_id = 9,
        post_id = 11,
        type = "thumbsup"
    )
    like20 = Like(
        user_id = 9,
        post_id = 6,
        type = "thumbsup"
    )
    like21 = Like(
        user_id = 10,
        post_id = 6,
        type = "thumbsup"
    )
    like22 = Like(
        user_id = 10,
        post_id = 7,
        type = "thumbsup"
    )
    like23 = Like(
        user_id = 11,
        post_id = 8,
        type = "thumbsup"
    )
    like24 = Like(
        user_id = 11,
        post_id = 9,
        type = "thumbsup"
    )
    like25 = Like(
        user_id = 12,
        post_id = 10,
        type = "thumbsup"
    )


    db.session.add(like1)
    db.session.add(like2)
    db.session.add(like3)
    db.session.add(like4)
    db.session.add(like5)
    db.session.add(like6)
    db.session.add(like7)
    db.session.add(like8)
    db.session.add(like9)
    db.session.add(like10)
    db.session.add(like11)
    db.session.add(like12)
    db.session.add(like13)
    db.session.add(like14)
    db.session.add(like15)
    db.session.add(like16)
    db.session.add(like17)
    db.session.add(like18)
    db.session.add(like19)
    db.session.add(like20)
    db.session.add(like21)
    db.session.add(like22)
    db.session.add(like23)
    db.session.add(like24)
    db.session.add(like25)

    db.session.commit()


# Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_likes():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.likes RESTART IDENTITY CASCADE;")
    else:
        db.session.execute("DELETE FROM likes")
        
    db.session.commit()