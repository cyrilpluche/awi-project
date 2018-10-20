------------------------------------------------------------
--        Delete table if exists
------------------------------------------------------------

DROP TABLE IF EXISTS public.Member CASCADE;
DROP TABLE IF EXISTS public.Project CASCADE;
DROP TABLE IF EXISTS public.Team CASCADE;
DROP TABLE IF EXISTS public.Permission CASCADE;
DROP TABLE IF EXISTS public.Action CASCADE;
DROP TABLE IF EXISTS public.Label CASCADE;
DROP TABLE IF EXISTS public.MemberHasProject CASCADE;
DROP TABLE IF EXISTS public.TeamHasMember CASCADE;
DROP TABLE IF EXISTS public.ActionOnProject CASCADE;
DROP TABLE IF EXISTS public.TeamHasProject CASCADE;
DROP TABLE IF EXISTS public.ActionOnProject CASCADE;
DROP TABLE IF EXISTS public.MemberHasPermissionTeam CASCADE;
DROP TABLE IF EXISTS public.MemberHasPermissionProject CASCADE;
DROP TABLE IF EXISTS public.ActionOnTeam CASCADE;
DROP TABLE IF EXISTS public.List CASCADE;
DROP TABLE IF EXISTS public.Card CASCADE;
DROP TABLE IF EXISTS public.Attachment CASCADE;
DROP TABLE IF EXISTS public.Task CASCADE;
DROP TABLE IF EXISTS public.ActionOnCard CASCADE;
DROP TABLE IF EXISTS public.ActionOnList CASCADE;
DROP TABLE IF EXISTS public.CardHasLabel CASCADE;

------------------------------------------------------------
--        Script Postgre
------------------------------------------------------------



------------------------------------------------------------
-- Table: Member
------------------------------------------------------------
CREATE TABLE public.Member(
	member_id             SERIAL NOT NULL ,
	member_firstname      VARCHAR (50) NOT NULL ,
	member_lastname       VARCHAR (50) NOT NULL ,
	member_pseudo         VARCHAR (250) NOT NULL ,
	member_email          VARCHAR (50)  ,
	member_password       VARCHAR (50)  ,
	member_token          VARCHAR (500) NOT NULL ,
	member_picture        VARCHAR (250)  ,
	member_status         INT  NOT NULL ,
	member_oauth_github   VARCHAR (250)   ,
	CONSTRAINT Member_PK PRIMARY KEY (member_id)
)WITHOUT OIDS;


------------------------------------------------------------
-- Table: Project
------------------------------------------------------------
CREATE TABLE public.Project(
	project_id            SERIAL NOT NULL ,
	project_title         VARCHAR (250) NOT NULL ,
	project_visibility    INT  NOT NULL ,
	project_status        INT  NOT NULL ,
	project_date_target   DATE    ,
	CONSTRAINT Project_PK PRIMARY KEY (project_id)
)WITHOUT OIDS;


------------------------------------------------------------
-- Table: Team
------------------------------------------------------------
CREATE TABLE public.Team(
	team_id     SERIAL NOT NULL ,
	team_name   VARCHAR (250) NOT NULL  ,
	CONSTRAINT Team_PK PRIMARY KEY (team_id)
)WITHOUT OIDS;


------------------------------------------------------------
-- Table: Permission
------------------------------------------------------------
CREATE TABLE public.Permission(
	permission_id            SERIAL NOT NULL ,
	permission_title         VARCHAR (250) NOT NULL ,
	permission_description   VARCHAR (500)   ,
	CONSTRAINT Permission_PK PRIMARY KEY (permission_id)
)WITHOUT OIDS;


------------------------------------------------------------
-- Table: Action
------------------------------------------------------------
CREATE TABLE public.Action(
	action_id            SERIAL NOT NULL ,
	action_type          INT  NOT NULL ,
	action_description   VARCHAR (250) NOT NULL ,
	member_id            INT  NOT NULL  ,
	CONSTRAINT Action_PK PRIMARY KEY (action_id)
)WITHOUT OIDS;


------------------------------------------------------------
-- Table: Label
------------------------------------------------------------
CREATE TABLE public.Label(
	label_id            SERIAL NOT NULL ,
	label_color         INT  NOT NULL ,
	label_description   VARCHAR (250)   ,
	CONSTRAINT Label_PK PRIMARY KEY (label_id)
)WITHOUT OIDS;


------------------------------------------------------------
-- Table: MemberHasProject
------------------------------------------------------------
CREATE TABLE public.MemberHasProject(
	project_id                INT  NOT NULL ,
	member_id                 INT  NOT NULL ,
	memberHasProject_status   INT  NOT NULL  ,
	CONSTRAINT MemberHasProject_PK PRIMARY KEY (project_id,member_id)
)WITHOUT OIDS;


------------------------------------------------------------
-- Table: TeamHasMember
------------------------------------------------------------
CREATE TABLE public.TeamHasMember(
	team_id       INT  NOT NULL ,
	member_id     INT  NOT NULL ,
	team_status   INT  NOT NULL  ,
	CONSTRAINT TeamHasMember_PK PRIMARY KEY (team_id,member_id)
)WITHOUT OIDS;


------------------------------------------------------------
-- Table: TeamHasProject
------------------------------------------------------------
CREATE TABLE public.TeamHasProject(
	project_id   INT  NOT NULL ,
	team_id      INT  NOT NULL ,
	thp_status   INT  NOT NULL  ,
	CONSTRAINT TeamHasProject_PK PRIMARY KEY (project_id,team_id)
)WITHOUT OIDS;


------------------------------------------------------------
-- Table: ActionOnProject
------------------------------------------------------------
CREATE TABLE public.ActionOnProject(
	action_id    INT  NOT NULL ,
	project_id   INT  NOT NULL  ,
	CONSTRAINT ActionOnProject_PK PRIMARY KEY (action_id,project_id)
)WITHOUT OIDS;


------------------------------------------------------------
-- Table: MemberHasPermissionTeam
------------------------------------------------------------
CREATE TABLE public.MemberHasPermissionTeam(
	team_id         INT  NOT NULL ,
	permission_id   INT  NOT NULL ,
	member_id       INT  NOT NULL ,
	mhpt_state      BOOL  NOT NULL  ,
	CONSTRAINT MemberHasPermissionTeam_PK PRIMARY KEY (team_id,permission_id,member_id)
)WITHOUT OIDS;


------------------------------------------------------------
-- Table: MemberHasPermissionProject
------------------------------------------------------------
CREATE TABLE public.MemberHasPermissionProject(
	permission_id   INT  NOT NULL ,
	project_id      INT  NOT NULL ,
	member_id       INT  NOT NULL ,
	mhpp_state      BOOL    ,
	CONSTRAINT MemberHasPermissionProject_PK PRIMARY KEY (permission_id,project_id,member_id)
)WITHOUT OIDS;


------------------------------------------------------------
-- Table: ActionOnTeam
------------------------------------------------------------
CREATE TABLE public.ActionOnTeam(
	action_id   INT  NOT NULL ,
	team_id     INT  NOT NULL  ,
	CONSTRAINT ActionOnTeam_PK PRIMARY KEY (action_id,team_id)
)WITHOUT OIDS;


------------------------------------------------------------
-- Table: List
------------------------------------------------------------
CREATE TABLE public.List(
	list_id               SERIAL NOT NULL ,
	list_title            VARCHAR (250) NOT NULL ,
	list_status           INT  NOT NULL ,
	project_id            INT  NOT NULL ,
	list_id_isTheFather   INT  NOT NULL  ,
	CONSTRAINT List_PK PRIMARY KEY (list_id)
)WITHOUT OIDS;


------------------------------------------------------------
-- Table: Card
------------------------------------------------------------
CREATE TABLE public.Card(
	card_id               SERIAL NOT NULL ,
	card_title            VARCHAR (250) NOT NULL ,
	card_description      VARCHAR (500)  ,
	card_status           INT  NOT NULL ,
	card_date_target      DATE   ,
	card_date_end         DATE   ,
	list_id               INT  NOT NULL ,
	card_id_isTheFather   INT  NOT NULL  ,
	CONSTRAINT Card_PK PRIMARY KEY (card_id)
)WITHOUT OIDS;


------------------------------------------------------------
-- Table: Attachment
------------------------------------------------------------
CREATE TABLE public.Attachment(
	attachment_id     SERIAL NOT NULL ,
	attachment_name   VARCHAR (250)  ,
	attachment_url    VARCHAR (250) NOT NULL ,
	card_id           INT  NOT NULL  ,
	CONSTRAINT Attachment_PK PRIMARY KEY (attachment_id)
)WITHOUT OIDS;


------------------------------------------------------------
-- Table: task
------------------------------------------------------------
CREATE TABLE public.task(
	task_id      SERIAL NOT NULL ,
	task_title   VARCHAR (250) NOT NULL ,
	cht_state    BOOL  NOT NULL ,
	card_id      INT  NOT NULL  ,
	CONSTRAINT task_PK PRIMARY KEY (task_id)
)WITHOUT OIDS;


------------------------------------------------------------
-- Table: ActionOnCard
------------------------------------------------------------
CREATE TABLE public.ActionOnCard(
	action_id   INT  NOT NULL ,
	card_id     INT  NOT NULL  ,
	CONSTRAINT ActionOnCard_PK PRIMARY KEY (action_id,card_id)
)WITHOUT OIDS;


------------------------------------------------------------
-- Table: ActionOnList
------------------------------------------------------------
CREATE TABLE public.ActionOnList(
	action_id   INT  NOT NULL ,
	list_id     INT  NOT NULL  ,
	CONSTRAINT ActionOnList_PK PRIMARY KEY (action_id,list_id)
)WITHOUT OIDS;


------------------------------------------------------------
-- Table: CardHasLabel
------------------------------------------------------------
CREATE TABLE public.CardHasLabel(
	card_id    INT  NOT NULL ,
	label_id   INT  NOT NULL  ,
	CONSTRAINT CardHasLabel_PK PRIMARY KEY (card_id,label_id)
)WITHOUT OIDS;




ALTER TABLE public.Action
	ADD CONSTRAINT Action_Member0_FK
	FOREIGN KEY (member_id)
	REFERENCES public.Member(member_id);

ALTER TABLE public.MemberHasProject
	ADD CONSTRAINT MemberHasProject_Project0_FK
	FOREIGN KEY (project_id)
	REFERENCES public.Project(project_id);

ALTER TABLE public.MemberHasProject
	ADD CONSTRAINT MemberHasProject_Member1_FK
	FOREIGN KEY (member_id)
	REFERENCES public.Member(member_id);

ALTER TABLE public.TeamHasMember
	ADD CONSTRAINT TeamHasMember_Team0_FK
	FOREIGN KEY (team_id)
	REFERENCES public.Team(team_id);

ALTER TABLE public.TeamHasMember
	ADD CONSTRAINT TeamHasMember_Member1_FK
	FOREIGN KEY (member_id)
	REFERENCES public.Member(member_id);

ALTER TABLE public.TeamHasProject
	ADD CONSTRAINT TeamHasProject_Project0_FK
	FOREIGN KEY (project_id)
	REFERENCES public.Project(project_id);

ALTER TABLE public.TeamHasProject
	ADD CONSTRAINT TeamHasProject_Team1_FK
	FOREIGN KEY (team_id)
	REFERENCES public.Team(team_id);

ALTER TABLE public.ActionOnProject
	ADD CONSTRAINT ActionOnProject_Action0_FK
	FOREIGN KEY (action_id)
	REFERENCES public.Action(action_id);

ALTER TABLE public.ActionOnProject
	ADD CONSTRAINT ActionOnProject_Project1_FK
	FOREIGN KEY (project_id)
	REFERENCES public.Project(project_id);

ALTER TABLE public.MemberHasPermissionTeam
	ADD CONSTRAINT MemberHasPermissionTeam_Team0_FK
	FOREIGN KEY (team_id)
	REFERENCES public.Team(team_id);

ALTER TABLE public.MemberHasPermissionTeam
	ADD CONSTRAINT MemberHasPermissionTeam_Permission1_FK
	FOREIGN KEY (permission_id)
	REFERENCES public.Permission(permission_id);

ALTER TABLE public.MemberHasPermissionTeam
	ADD CONSTRAINT MemberHasPermissionTeam_Member2_FK
	FOREIGN KEY (member_id)
	REFERENCES public.Member(member_id);

ALTER TABLE public.MemberHasPermissionProject
	ADD CONSTRAINT MemberHasPermissionProject_Permission0_FK
	FOREIGN KEY (permission_id)
	REFERENCES public.Permission(permission_id);

ALTER TABLE public.MemberHasPermissionProject
	ADD CONSTRAINT MemberHasPermissionProject_Project1_FK
	FOREIGN KEY (project_id)
	REFERENCES public.Project(project_id);

ALTER TABLE public.MemberHasPermissionProject
	ADD CONSTRAINT MemberHasPermissionProject_Member2_FK
	FOREIGN KEY (member_id)
	REFERENCES public.Member(member_id);

ALTER TABLE public.ActionOnTeam
	ADD CONSTRAINT ActionOnTeam_Action0_FK
	FOREIGN KEY (action_id)
	REFERENCES public.Action(action_id);

ALTER TABLE public.ActionOnTeam
	ADD CONSTRAINT ActionOnTeam_Team1_FK
	FOREIGN KEY (team_id)
	REFERENCES public.Team(team_id);

ALTER TABLE public.List
	ADD CONSTRAINT List_Project0_FK
	FOREIGN KEY (project_id)
	REFERENCES public.Project(project_id);

ALTER TABLE public.List
	ADD CONSTRAINT List_List1_FK
	FOREIGN KEY (list_id_isTheFather)
	REFERENCES public.List(list_id);

ALTER TABLE public.Card
	ADD CONSTRAINT Card_List0_FK
	FOREIGN KEY (list_id)
	REFERENCES public.List(list_id);

ALTER TABLE public.Card
	ADD CONSTRAINT Card_Card1_FK
	FOREIGN KEY (card_id_isTheFather)
	REFERENCES public.Card(card_id);

ALTER TABLE public.Attachment
	ADD CONSTRAINT Attachment_Card0_FK
	FOREIGN KEY (card_id)
	REFERENCES public.Card(card_id);

ALTER TABLE public.task
	ADD CONSTRAINT task_Card0_FK
	FOREIGN KEY (card_id)
	REFERENCES public.Card(card_id);

ALTER TABLE public.ActionOnCard
	ADD CONSTRAINT ActionOnCard_Action0_FK
	FOREIGN KEY (action_id)
	REFERENCES public.Action(action_id);

ALTER TABLE public.ActionOnCard
	ADD CONSTRAINT ActionOnCard_Card1_FK
	FOREIGN KEY (card_id)
	REFERENCES public.Card(card_id);

ALTER TABLE public.ActionOnList
	ADD CONSTRAINT ActionOnList_Action0_FK
	FOREIGN KEY (action_id)
	REFERENCES public.Action(action_id);

ALTER TABLE public.ActionOnList
	ADD CONSTRAINT ActionOnList_List1_FK
	FOREIGN KEY (list_id)
	REFERENCES public.List(list_id);

ALTER TABLE public.CardHasLabel
	ADD CONSTRAINT CardHasLabel_Card0_FK
	FOREIGN KEY (card_id)
	REFERENCES public.Card(card_id);

ALTER TABLE public.CardHasLabel
	ADD CONSTRAINT CardHasLabel_Label1_FK
	FOREIGN KEY (label_id)
	REFERENCES public.Label(label_id);
