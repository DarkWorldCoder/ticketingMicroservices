import axios from 'axios';

export default ({ req }) => {
  if (typeof window === 'undefined') {
    // We are on the server

    return axios.create({
      baseURL:"http://www.ticketbook.me",

      // 'http://ingress-nginx-controller.ingress-nginx.svc.cluster.local',
      // "http://ticketing.dev",
      // ,
      headers: req.headers,
    });
  } else {
    // We must be on the browser
    return axios.create({
      baseUrl: 'http://www.ticketbook.me',
    });
  }
};