from app.models import db, User, environment, SCHEMA


# Adds a demo user, you can add other users here if you want
def seed_users():
    demo = User(
        first_name='Demo',
        last_name='User',
        email='demo@aa.io',
        password='password',
        description = 'Software Engineer',
        education = "University of Mars Ultor.Bachelor of Science - BS - Agriculture.400 BCE - 299 BCE",
        location = "Olympus Mons, Mars, The Solar System",
        employment = "Regional Manager of Chariots Enterpise.Chariots Enterprise.299 BCE - Present",
        profile_image="https://www.worldhistory.org/img/c/p/1200x627/2119.jpg"
    )
    marnie = User(
        first_name='Dan',
        last_name='Alighieri',
        email='danalighieri@aa.io',
        password='password',
        description = 'Software Support Engineer',
        education = "University of Paradiso.Bachelor of Arts - BA - Humanities.1290 - 1295",
        location = "Florence, Italy",
        employment = "Visitor.The Inferno.1300 - Present",
        profile_image = "https://www.shutterstock.com/image-vector/april-27-2018-modern-vector-260nw-1078184282.jpg"
    )
    bobbie = User(
        first_name='Bobbie',
        last_name='Bill',
        email='bobbie@aa.io',
        password='password',
        description = 'Software Developer',
        education = "University of Kepler.Bachelor of Science - BS - Mechanical Engineering.2001 - 2005",
        location = "Kepler-452b, Kepler-186 System",
        employment = "Sr Software Developer.The Habitat Company.2019 - Present, Jr Software Developer.KASA.2015 - 2018",
        profile_image = "https://upload.wikimedia.org/wikipedia/commons/4/45/Kepler_Space_Telescope_spacecraft_model_2.png"
    )
    amos = User(
        first_name='Amos',
        last_name='Burton',
        email='tim@te.io',
        password='password',
        description = 'Chief Engineer of the Rocinante',
        location = "Baltimore, Earth, The Solar System",
        employment = "Chief Engineer of the Roci.Rocinante.2326 - 2400,Asistant Engineer of the Canterbury.Canterbury.2325 - 2326",
        profile_image = "https://i.scdn.co/image/ab67706c0000bebb366a550785adb441ecd56f05"
    )
    camina = User(
        first_name='Camina',
        last_name='Drummer',
        email='camina@te.io',
        password='password',
        description = 'President of the Transport Union',
        education = "College of Ceres.Bachelor of Arts - BA - Communications.2316 - 1319",
        location = "The Belt, The Solar System",
        employment = "President of the Transport Union.Transport Union.2345 - 2364,OPAN Captain/StationCommander.Medina Station.2330 - 2343,Assistant Director.Tycho Station.2320 - 2330",
        profile_image = "https://static.wikia.nocookie.net/expanse/images/3/35/Camina_Drummer_S4_.png"    
    )
    daeny = User(
        first_name='Daenerys',
        last_name='Targaryen',
        email='danny@got.io',
        password='password',
        description = 'Daenerys Stormborn of House Targaryen, the First of Her Name, Queen of the Andals and the First Men, Protector of the Seven Kingdoms, the Mother of Dragons, the Khaleesi of the Great Grass Sea, the Unburnt, the Breaker of Chains',
        education = "Dothraki University.Bachelor of Arts - BA - Business.293 AC - 299 AC",
        location = "The Crownlands, Westeros",
        employment = "Princess.Dragonstone.282 AC - 305 AC,Queen.Meereen.282 AC - 305 AC,Mother.Dragons.282 AC - 305 AC,Khaleesi.Great Grass Sea.282 AC - 305 AC,The Unburnt.Fire.282 AC - 305 AC,Breaker.Chains.282 AC - 305 AC,Queen.Andals and the Rhoynar and the First Men.282 AC - 305 AC,Protector.Seven Kingdoms.282 AC - 305 AC",
        profile_image = "https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/daenerys-targaryen-meme-1556127294.png"
    
    )
    albert = User(
        first_name='Albert',
        last_name='Einstein',
        email='theeinstein@gen.io',
        password='password',
        description = 'Theoretical Physicist',
        education = "University of Zuriich.PhD - Physics.1900 - 1905,ETH Zurich.Bachelor of Arts - BA - Physics.1896 - 1900",
        location = "Princeton, New Jersey",
        employment = "Resident Scholar.Institute of Advanced Study - Princeton University.1933 - 1955,President.German Physical Society.1916 - 1918,Assistant Examiner.Swiss Patent Office.1902 - 1909",
        profile_image = "https://parade.com/.image/t_share/MTkwNTgwOTUyNjU2Mzg5MjQ1/albert-einstein-quotes-jpg.jpg"
    )
    bill = User(
        first_name='Bill',
        last_name='Gates',
        email='billgates@ms.io',
        password='password',
        description = 'Chairperson of the Bill and Melindaa Gates Foundation',
        education = "Harvard University.Law.1973 - 1975",
        location = "Seattle, Washington",
        employment = "Co-founder.Bill & Melinda Gates Foundation.2000 - Present,Co-founder and CEO.Microsoft.1975 - 2000",
        profile_image = "http://t1.gstatic.com/licensed-image?q=tbn:ANd9GcQi4a8NzG1ocCbgUUZxxDLocQwDQvhod4gHC3aRRg3juK0LDsZHECn7AwMJq8WUmPFLai9IJhY5YWNLRys"
    )
    bat = User(
        first_name='Bruce',
        last_name='Wayne',
        email='batmaninc@ms.io',
        password='password',
        description = 'Chairperson of Wayne Eterprises, inc.',
        education = "Yale University.Law.?",
        location = "Gotham, New Jersey",
        employment = "Chairperson.Wayne Eterprises.1979 - Present",
        profile_image = "https://s3.amazonaws.com/comicgeeks/characters/avatars/1.jpg?t=1667273296"
    )
    prom = User(
        first_name='Prometheus',
        last_name='Clay',
        email='fireman@titan.com',
        password='password',
        description = 'Titan god of fire',
        education = "Titans school for the gifted.?.?",
        location = "Mount Elbrus, Kabardino-Balkaria",
        employment = "Leader.Civilization.507 - Present",
        profile_image = "https://static.wikia.nocookie.net/kablam/images/b/b5/Screen_Shot_2015-05-11_at_4.17.33_PM.png"
    )
    galil = User(
        first_name='Galileo',
        last_name='Galilei',
        email='helio@sol.io',
        password='password',
        description = 'Astronomer, Physicist, and Engineer',
        education = "University of Pisa.Medicine.1581 - 1585",
        location = "Pisa, Italy",
        employment = "Scholar.University of Padua.1592 - 1610,Chair of mathematics.University of Pisa.1589 - 1592",
        profile_image = 'https://upload.wikimedia.org/wikipedia/commons/5/5d/Galileo-sustermans4.jpg'
    )
    dave = User(
        first_name='David',
        last_name='Hume',
        email='localskeptic@sco.io',
        password='password',
        description = 'Philosopher and Empiricist',
        education = "Edinburgh University.?.1723 - 1726",
        location = "Edinburgh, Scotland",
        employment = "Librarian.Faculty of Advocates.1752 - 1754,Librarian and scholar.University of Edinburgh.?",
        profile_image = "https://cdn.theatlantic.com/thumbor/PVz1QM-nHQjZSNqaZBWqc3-8BMU=/271x35:2335x1583/1200x900/media/img/2015/09/BOB_Essay_Opener_WEBCrop/original.jpg"
    )



    db.session.add(demo)
    db.session.add(marnie)
    db.session.add(bobbie)
    db.session.add(amos)
    db.session.add(camina)
    db.session.add(daeny)
    db.session.add(albert)
    db.session.add(bill)
    db.session.add(bat)
    db.session.add(prom)
    db.session.add(galil)
    db.session.add(dave)

    db.session.commit()


# Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_users():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.users RESTART IDENTITY CASCADE;")
    else:
        db.session.execute("DELETE FROM users")
        
    db.session.commit()