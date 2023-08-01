      /*following: 50,
      followers: 75,
    listcount: 5,*/

const UsersDummyData = {
    1: {
      id: 1,
      name: "Arielle",
      description: "I do frontend stuff and im tired ",
      pfp: "https://cdn-icons-png.flaticon.com/512/2166/2166820.png",
    },

    2: {
        id: 2,
        name: 'Marie',
        description: 'Team Lead',
        pfp:'https://i.ibb.co/JkYkFDT/marie-pic.jpg',

      },
    3:{
        id: 3,
        name: 'Francis',
        description: 'Backend Engineer',
        pfp:'https://thumbs.dreamstime.com/b/back-end-development-color-line-icon-server-application-database-pictogram-web-page-mobile-app-promo-ui-ux-gui-design-229149260.jpg',

      },
    4:{
        id: 4,
        name: 'Aaron',
        description: 'Backend Lead and Github Master',
        pfp: 'https://us.123rf.com/450wm/naum100/naum1002102/naum100210200133/164186052-web-development-back-end-and-front-end-developer-male-character-back-view-trendy-style-vector.jpg?ver=6',

      },
    5: {
        id: 5,
        name: 'Tommy',
        description: 'Document Engineer Frontend Engineer',
        pfp:
          'https://github.githubassets.com/images/modules/logos_page/GitHub-Mark.png',

      },
    6: {
        id: 6,
        name: 'Arielle',
        description: 'Frontend Lead',
        pfp:'https://media.istockphoto.com/id/1304570729/vector/front-end-development-concept-vector-flat-graphic-design-illustration.jpg?s=612x612&w=is&k=20&c=-DSvmqA-kATb09ZQWxRgRZ3HC4LA5KFG22_xEdVkRhQ=',

      },
    7:{
        id: 7,
        name: 'Kenneth',
        description: 'Frontend Engineer',
        pfp:'https://cdn-icons-png.flaticon.com/512/2166/2166820.png',
      },
    8:{
        id: 8,
        name: 'Rabin',
        description: 'Database Master',
        pfp:'https://media.istockphoto.com/id/1238951588/vector/database-icon.jpg?s=612x612&w=0&k=20&c=FDz7njKjWIYhiV-CDgJoj8fkkmSrtv88Tv7SiN_E08Y=',

      },
  };
  
  const UsersDummyData2 = {

    1: {
        id: 1,
        name: 'Marie',
        description: 'Team Lead',
        pfp:'https://i.ibb.co/JkYkFDT/marie-pic.jpg',

      },
    2: {
        id: 2,
        name: "Arielle",
        description: "I do frontend stuff and im tired ",
        pfp: "https://cdn-icons-png.flaticon.com/512/2166/2166820.png",
      },
    3:{
        id: 3,
        name: 'Francis',
        description: 'Backend Engineer',
        pfp:'https://thumbs.dreamstime.com/b/back-end-development-color-line-icon-server-application-database-pictogram-web-page-mobile-app-promo-ui-ux-gui-design-229149260.jpg',

      },
    4:{
        id: 4,
        name: 'Aaron',
        description: 'Backend Lead and Github Master',
        pfp: 'https://us.123rf.com/450wm/naum100/naum1002102/naum100210200133/164186052-web-development-back-end-and-front-end-developer-male-character-back-view-trendy-style-vector.jpg?ver=6',

      

      },
  };

  const notifications = [
    {
      id: 1,
      icon: <i className="fas fa-bell"></i>,
      title: 'Update from a List you followed!',
      message: 'Arielle added "Hell" to her List "Why do I do this to myself".'
    },
    {
      id: 2,
      icon: <i className="fas fa-heart"></i>,
      title: 'List Notice',
      message: 'Tommy Added your List, "Bay Area Favorites" to his list.'
    },
    {
      id: 3,
      icon: <i className="fas fa-comment"></i>,
      title: 'List Invite',
      message: 'Marcel wants to invite you to his shared List "The Grand Line" group.'
    }
  ];

  export {notifications, UsersDummyData2};
  export default UsersDummyData;