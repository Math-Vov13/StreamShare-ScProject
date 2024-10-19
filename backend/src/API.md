# API

**base_url :** `localhost:3000/`


## AUTHENTICATION Endpoints
</br>

### Groups

<u>create group id</u> [🔑]
```json
POST /groups/auth
{
    "Mail": "test@test.com",
    "Password": "**********"
}

> *set cookie: refresh_token*
> *set cookie: access_token*
> (201) {response: <group_id>}
```

<u>delete cookies</u>
```json
DELETE /groups/auth

> *delete all cookies*
> (205) "Reset Content"
```
</br>

### Users

<u>create user token</u> [🔒][🔑]
```json
POST /groups/{group_id}/users/auth?name={name}

> *set cookie: user_token*
> (201) "CREATED"
```

<u>delete user cookie</u> [🔒]
```json
DELETE /groups/{group_id}/users/auth

> *delete user cookie*
> (205) "Reset Content"
```
</br>


## GROUPS Endpoints

<u>get group</u> [🔒]
```json
GET /groups

> (200) {"id": 1234, "name": "Familial_Group", ...}
```

<u>create group</u> [SERVICES (Paypal / Banques)]
```json
POST /groups
{
    "Name": "group",
    "Mail": "test@test.com",
    "Password": "**********",
    "Subscription": "Tier 1",
}

> (201) "CREATED"
```

<u>update group</u> [🔒]
```json
PUT /groups
{
    "Name": "newgroup",
    ...
}

> (200) "OK"
```

<u>delete group</u> [SERVICES]
```json
DELETE /groups
{
    "Mail": "test@test.com",
    "Password": "**********"
}

> (200) "OK"
```
</br>


## USERS Endpoints

<u>get users</u> [🔒]
```json
GET /groups/{group_id}/users

> (200) [{"id": 1234, "name": "User", ...}]
```

<u>get user</u> [🔒] + [🔑]
```json
GET /groups/{group_id}/users?name={name}

> (200) {"id": 1234, "name": "User", ...}
```

<u>create user</u> [🔒]
```json
POST /groups/{group_id}/users
{
    Name: "...",
    Image: "...",
    Type: "Adult" / "Children"
}

> (201) "CREATED"
```

<u>update user</u> [🔒]
```json
PUT /groups/{group_id}/users?name={name}
{
    Name: "..." (optional),
    Image: "..." (optional),
    Preferences: ["..."] (optional)
}

> (200) "OK"
```

<u>delete user</u> [🔒]
```json
DELETE /groups/{group_id}/users?name={name}
{
    "Password": "**********"
}

==> (200) "OK"
```
</br>


## Content Endpoints

<u>search content</u> (based on criteria) [🔒+🔒]
```json
GET /search
{
    "fulfil_name": "name...",
    "category": "...",
    "tags": ["...", "..."]
}

> (200) {"index": 0, "content": {"id": 1234, "name": "XXX", "img": "link to img..."}, "index": 1, "content": ...}
```

<u>get content</u> [🔒+🔒]
```json
GET /search/{content_id}

> (200) {"id": 1234, "link": "cloudfront......"}
```

<u>delete content</u> [SERVICES]
```json
DELETE /search/{content_id}

> (200) "OK"
```