Team mapping is an option when you add a Corporate or Guest IdP.
The option name differs depending on the protocol you are using to connect:

- For OpenID Connect, the option is referred to as _team claim mapping_.
- For SAML 2, the option is referred to as _team attribute mapping_.

In both instances, team mapping is a way to specify what you want your IdP groups to be labeled as in Reunite.

You can also use team mapping to assign users in your IdP groups different [project RBAC teams](../access/index.md#assign-roles-to-specified-teams) or [organization roles](../reunite/organization/teams.md#team-mapping) than the default team and role.

When users log in with an IdP, the groups assigned in the IdP override the RBAC teams assigned in Reunite.
