const requests = [
    {
      id: 1,
      sender_fk: 1,
      receiver_fk: 2,
      is_accepted: true,
      is_read: true,
    },
    {
      id: 2,
      sender_fk: 3,
      receiver_fk: 1,
      is_accepted: false,
      is_read: false,
    },
    {
      id: 3,
      sender_fk: 2,
      receiver_fk: 3,
      is_accepted: false,
      is_read: true,
    },
  ];

  const notifications = [
    {
      "id": 1,
      "content": "Testing comment 1",
      "is_read": 0,
      "user_fk": 1,
      "creation_time": "2023-05-16T21:14:16.000Z"
    },
    {
      "id": 2,
      "content": "Aaron added \"Starbucks\" to \"list or something\"",
      "is_read": 0,
      "user_fk": 1,
      "creation_time": "2023-05-16T21:13:47.000Z"
    },
    {
      "id": 4,
      "content": "You have a new message from user 2",
      "is_read": 0,
      "user_fk": 1,
      "creation_time": "2023-05-17T06:07:24.000Z"
    },
    {
      "id": 5,
      "content": "marie liked your post!",
      "is_read": 0,
      "user_fk": 1,
      "creation_time": "2023-05-17T06:41:41.000Z"
    },
    {
      "id": 6,
      "content": "marie liked your post!",
      "is_read": 0,
      "user_fk": 1,
      "creation_time": "2023-05-17T18:44:08.000Z"
    }
  ];

  export {requests};
  export default notifications;