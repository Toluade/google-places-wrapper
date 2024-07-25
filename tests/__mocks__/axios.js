const axios = {
  post: jest.fn().mockResolvedValue({
    data: {
      places: [
        {
          displayName: "Test Place",
          formattedAddress: "18 Olayinka Street",
          location: { lat: 0, lng: 0 },
        },
      ],
    },
  }),
};

module.exports = axios;
