var level = require('level'),
    sublevel = require('level-sublevel'),
    directory = process.argv[2],
    db = sublevel(level(directory)),
    robots = db.sublevel('robots'),
    dinos = db.sublevel('dinosaurs');

robots.put('slogan', 'beep boop');
dinos.put('slogan', 'rawr');
