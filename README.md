## fresk.digital assignemnt

This repo is a small assignment I was handed by an employer as a kind of test. It is a basic CRUD application that pulls data from a public API and displays it in the browser.

### Overview

I chose to use NextJS 13 App Router for this project, even though I have barely used it - risky choice. But I loved the developer experience. My rationale for this choice was Next allows us to server render everything, so we can fully utilise our deployment hardware and take the load of our users devices.

### Development

```
npm run dev
```

### Deploying

This project is hosted on [fly.io](https://fly.io/) and is automaticalyl deployed to my personal account on every push

### Testing

Currently the project only has unit tests, I wanted to add Cypress e2e tests as well but In the interest of time I just decided to leave it here. You can run the unit tests wth

```
npm run test
```

### Future improvements

1. The API fails ocassionally to test my ability to handle errors, I decided to just inform the user that something has went wrong and let them retry the action manually. A better solution would be to bring a caching middleware in like Redis, and our API would first check Redis for results, disply them and then revalidate by hitting the upstream API, updating the redis cache if successful, and using a retry mechanism if failed. This would hide the API errors from our users - especcially as this data is quite static, we can safely cache it for a long time.

2. End to end testing - I have been trying to install Cypress here for the last hour - but its just taking far too long on my current network connection. This would be a no-brainer improvement, adding them into the CI on every push, before we deploy. This would also allow us to test the more fiddly UI business logic.

3. Pagination in the UI - pagination is currently supported in our NextJS API via `page` and `pageSize` params, but I did not create any UI for this, in the interest of time. I decided to limit results to only 20 cassettes for the time being to improve render speed.

4. Image placeholders - it would be nice to have some kind of loading placeholder we can display when we have not yet fetched the cassette images from the upstream API.
