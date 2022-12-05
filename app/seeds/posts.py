from app.models import db, User, Post, environment, SCHEMA


# Adds a demo user, you can add other users here if you want
def seed_posts():
    post1 = Post(
        user_id = 1,
        post_body = "Mars is there, waiting to be reached.",
        images = "[https://mars.nasa.gov/system/site_config_values/meta_share_images/1_mars-nasa-gov.jpg, https://www.nasa.gov/sites/default/files/styles/full_width_feature/public/thumbnails/image/pia25190.jpeg, https://www.nasa.gov/sites/default/files/styles/full_width_feature/public/thumbnails/image/pia24836_perseverance_selfie_at_rochette_figure_3_croppedcloseup.jpeg]"
    )
    post2 = Post(
        user_id = 1,
        post_body = "It was Mars, the god of war, and for me, the fighting man, it had always held the power of irresistible enchantment. As I gazed at it on that far-gone night it seemed to call across the unthinkable void, to lure me to it, to draw me as the lodestone attracts a particle of iron.\n\n- Edgar Rice Burroughs",
        images = "[https://media.mythopedia.com/2mZ7liWNSTYYXRVRSbeZ0e/f787be1fa5ab5052c29e65bf91c231b9/relief-of-mars-ultor-roman-cleveland-museum-of-art.jpg]"
    )
    post3 = Post(
        user_id = 3,
        post_body = "In the middle of the journey of our life I found myself within a dark woods where the straight way was lost.",
        images = "[https://www.beingguru.com/wp-content/uploads/2018/07/never-giveup.jpg]"
    )
    post4 = Post(
        user_id = 1,
        post_body = "testing post 4",
        images = "[https://i.imgur.com/Ve9zZPX.jpeg]"
    )
    post5 = Post(
        user_id = 2,
        post_body = "testing post 5",
        images = "[https://i.imgur.com/ISWtVym.jpeg]"
    )
    post6 = Post(
        user_id = 3,
        post_body = "testing post 6",
        images = ""
    )

    db.session.add(post1)
    db.session.add(post2)
    db.session.add(post3)
    db.session.add(post4)
    db.session.add(post5)
    db.session.add(post6)

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