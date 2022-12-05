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
        user_id = 2,
        post_body = "When life gets you down, don't hide in the sink. Stand up, keep your head high, and show them what you got! Here are some images of my journey from when the dog was at our house",
        images = "[https://i.imgur.com/Ve9zZPX.jpeg, https://cdn.britannica.com/29/150929-050-547070A1/lion-Kenya-Masai-Mara-National-Reserve.jpg]"
    )
    post5 = Post(
        user_id = 2,
        post_body = "Feeling overwhelmed is common. It’s a sign that the demands on your time and energy have surpassed your ability to cope with them. Sometimes overwhelm is temporary; other times, it can lead to persistent and unhealthy pressure and strain. The good news is that with the right mindset you can make the unmanageable feel manageable again. Discover how to disrupt the stress circuit, cultivate calm and positive emotions, and take small, imperfect steps toward resolution.",
        images = "[https://i.imgur.com/ISWtVym.jpeg]"
    )
    post6 = Post(
        user_id = 3,
        post_body = "Excited to have joined the team at Google to lead comms for YouTube OuterSpace. Look forward to collaborating with many of you in the year ahead.",
        images = "[https://upload.wikimedia.org/wikipedia/commons/thumb/3/32/Googleplex_HQ_%28cropped%29.jpg/1920px-Googleplex_HQ_%28cropped%29.jpg]"
    )
    post7 = Post(
        user_id = 4,
        post_body = "I didn't always work in space.\n\nIt suddenly struck me that that tiny pea, pretty and blue, was the Earth. I put up my thumb and shut one eye, and my thumb blotted out the planet Earth.",
        images = ""
    )
    post8 = Post(
        user_id = 3,
        post_body = "Here are some pictures of our recent visit to Europa",
        images = "[https://www.nasa.gov/sites/default/files/styles/image_card_4x3_ratio/public/thumbnails/image/trappist1-during-press-conference-web.gif,https://www.nasa.gov/sites/default/files/styles/image_card_4x3_ratio/public/316542main_0712_0025.jpg,https://photojournal.jpl.nasa.gov/thumb/PIA17004.gif]"
    )
    post9 = Post(
        user_id = 9,
        post_body = 'A man I knew once said, "If you’re good at something, never do it for free.". Focus is key. Spreading your resources and attention across too many fronts can affect your business growth. ',
        images = "[https://images.saymedia-content.com/.image/t_share/MTc0MjU4ODA1NjIwNjE1MDM2/the-top-six-rich-guys-in-the-dc-universe.jpg]"
    )
    post10 = Post(
        user_id = 8,
        post_body = "I'm a great believer that any tool that enhances communication has profound effects in terms of how people can learn from each other, and how they can achieve the kind of freedoms that they're interested in.",
        images = ""
    )
    post11 = Post(
        user_id = 12,
        post_body = "A man acquainted with history may, in some respect, be said to have lived from the beginning of the world, and to have been making continual additions to his stock of knowledge in every century.",
        images = "[https://live.staticflickr.com/8229/8492603154_77fcb374cd_b.jpg]"
    )


    db.session.add(post1)
    db.session.add(post2)
    db.session.add(post3)
    db.session.add(post4)
    db.session.add(post5)
    db.session.add(post6)
    db.session.add(post7)
    db.session.add(post8)
    db.session.add(post9)
    db.session.add(post10)
    db.session.add(post11)

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