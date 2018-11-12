------------------------------------------------------------
--        Member
------------------------------------------------------------

INSERT INTO public.member (
    member_id,
    member_firstname,
    member_lastname,
    member_pseudo,
    member_email,
    member_password,
    member_status
)
VALUES (
    1,
    'Colonel',
    'Reyel',
    'colonelreyel',
    'awi.project.option1.g1@gmail.com',
    'password',
    1

);

------------------------------------------------------------
--        Label
------------------------------------------------------------

INSERT INTO public.member (
    member_id,
    member_firstname,
    member_lastname,
    member_pseudo,
    member_email,
    member_password,
    member_status
)
VALUES (
    1,
    'Colonel',
    'Reyel',
    'colonelreyel',
    'awi.project.option1.g1@gmail.com',
    'password',
    1

);

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