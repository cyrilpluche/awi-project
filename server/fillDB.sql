------------------------------------------------------------
--        Permissions
------------------------------------------------------------

INSERT INTO public.permission (
    permission_id,
    permission_title,
    permission_description
)
VALUES (
    1,
    'admin',
    'have all permissions on the team'
);

INSERT INTO public.permission (
    permission_id,
    permission_title,
    permission_description
)
VALUES (
    2,
    'add/remove members',
    'add and remove member in the team'
);

INSERT INTO public.permission (
    permission_id,
    permission_title,
    permission_description
)
VALUES (
    3,
    'admin',
    'have all permissions on the project'
);