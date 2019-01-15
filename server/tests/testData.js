export default {
  contacts: [
    {
      name: 'Ade',
      phoneNumber: '08037897567',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      name: 'Emmanuel',
      phoneNumber: '0907468903',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      name: 'Francis',
      phoneNumber: '03484384398543',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      name: 'Underwood',
      phoneNumber: '8934584398598',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  ],
  messages: [
    {
      senderId: 1,
      receiverId: 2,
      message: 'this is a message',
      status: false,
      createdAt: new Date(),
      updatedAt: new Date(),

    },
    {
      senderId: 1,
      receiverId: 3,
      message: 'this is an sms message',
      status: true,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      senderId: 3,
      receiverId: 1,
      message: 'this is another message',
      status: true,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      senderId: 4,
      receiverId: 3,
      message: 'sms message, this is',
      status: false,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      senderId: 2,
      receiverId: 1,
      message: 'this is yet another message',
      status: false,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  ]
};
