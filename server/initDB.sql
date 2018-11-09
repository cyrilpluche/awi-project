------------------------------------------------------------
--        Delete table if exists
------------------------------------------------------------

DROP TABLE IF EXISTS public.Member CASCADE;
DROP TABLE IF EXISTS public.Project CASCADE;
DROP TABLE IF EXISTS public.Team CASCADE;
DROP TABLE IF EXISTS public.List CASCADE;
DROP TABLE IF EXISTS public.Card CASCADE;
DROP TABLE IF EXISTS public.Permission CASCADE;
DROP TABLE IF EXISTS public.Action CASCADE;
DROP TABLE IF EXISTS public.Label CASCADE;
DROP TABLE IF EXISTS public.Attachment CASCADE;
DROP TABLE IF EXISTS public.Task CASCADE;
DROP TABLE IF EXISTS public.MemberHasProject CASCADE;
DROP TABLE IF EXISTS public.TeamHasMember CASCADE;
DROP TABLE IF EXISTS public.TeamHasProject CASCADE;
DROP TABLE IF EXISTS public.MemberHasAction CASCADE;
DROP TABLE IF EXISTS public.MemberHasCard CASCADE;
DROP TABLE IF EXISTS public.MemberHasPermissionTeam CASCADE;
DROP TABLE IF EXISTS public.MemberHasPermissionProject CASCADE;
DROP TABLE IF EXISTS public.CardHasLabel CASCADE;
DROP TABLE IF EXISTS public.MemberHasCard CASCADE;

------------------------------------------------------------
--        Script Postgre
------------------------------------------------------------



------------------------------------------------------------
-- Table: Member
------------------------------------------------------------
CREATE TABLE public.Member(
    member_id                   SERIAL NOT NULL ,
    member_firstname            VARCHAR (50) NOT NULL ,
    member_lastname             VARCHAR (50) NOT NULL ,
    member_pseudo               VARCHAR (250) NOT NULL ,
    member_email                VARCHAR (50)  ,
    member_password             VARCHAR (50)  ,
    member_picture              VARCHAR (250)  ,
    member_status               INT  NOT NULL ,
	member_is_link_with_github  BOOL  DEFAULT false  ,
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
-- Table: List
------------------------------------------------------------
CREATE TABLE public.List(
	list_id       SERIAL NOT NULL ,
	list_title    VARCHAR (250) NOT NULL ,
	list_status   INT  NOT NULL ,
	list_father   INT   ,
	list_child    INT   ,
	project_id    INT  NOT NULL  ,
	CONSTRAINT List_PK PRIMARY KEY (list_id)

	,CONSTRAINT List_Project_FK FOREIGN KEY (project_id) REFERENCES public.Project(project_id) ON DELETE CASCADE
)WITHOUT OIDS;


------------------------------------------------------------
-- Table: Card
------------------------------------------------------------
CREATE TABLE public.Card(
	card_id            SERIAL NOT NULL ,
	card_title         VARCHAR (250) NOT NULL ,
	card_description   VARCHAR (500)  ,
	card_status        INT  NOT NULL ,
	card_date_target   DATE   ,
	card_date_end      DATE   ,
	card_father        INT   ,
	card_child         INT   ,
	list_id            INT  NOT NULL  ,
	CONSTRAINT Card_PK PRIMARY KEY (card_id)

	,CONSTRAINT Card_List_FK FOREIGN KEY (list_id) REFERENCES public.List(list_id) ON DELETE CASCADE
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
	action_id              SERIAL NOT NULL ,
	action_type            INT  NOT NULL ,
	action_title           VARCHAR (50) NOT NULL ,
	action_description     VARCHAR (250) NOT NULL ,
	action_date_creation   DATE  NOT NULL ,
	card_id                INT   ,
	list_id                INT   ,
	project_id             INT   ,
	team_id                INT    ,
	CONSTRAINT Action_PK PRIMARY KEY (action_id)

	,CONSTRAINT Action_Card_FK FOREIGN KEY (card_id) REFERENCES public.Card(card_id)
	,CONSTRAINT Action_List0_FK FOREIGN KEY (list_id) REFERENCES public.List(list_id)
	,CONSTRAINT Action_Project1_FK FOREIGN KEY (project_id) REFERENCES public.Project(project_id) ON DELETE CASCADE
	,CONSTRAINT Action_Team2_FK FOREIGN KEY (team_id) REFERENCES public.Team(team_id)
)WITHOUT OIDS;


------------------------------------------------------------
-- Table: Label
------------------------------------------------------------
CREATE TABLE public.Label(
	label_id            SERIAL NOT NULL ,
	label_color         VARCHAR (50)   NOT NULL ,
	label_description   VARCHAR (250)   ,
	CONSTRAINT Label_PK PRIMARY KEY (label_id)
)WITHOUT OIDS;


------------------------------------------------s------------
-- Table: Attachment
------------------------------------------------------------
CREATE TABLE public.Attachment(
	attachment_id     SERIAL NOT NULL ,
	attachment_name   VARCHAR (250)  ,
	attachment_url    VARCHAR (250) NOT NULL ,
	card_id           INT  NOT NULL  ,
	CONSTRAINT Attachment_PK PRIMARY KEY (attachment_id)

	,CONSTRAINT Attachment_Card_FK FOREIGN KEY (card_id) REFERENCES public.Card(card_id) ON DELETE CASCADE
)WITHOUT OIDS;


------------------------------------------------------------
-- Table: Task
------------------------------------------------------------
CREATE TABLE public.Task(
	task_id      SERIAL NOT NULL ,
	task_title   VARCHAR (250) NOT NULL ,
	cht_state    BOOL  NOT NULL ,
	card_id      INT  NOT NULL  ,
	CONSTRAINT Task_PK PRIMARY KEY (task_id)

	,CONSTRAINT Task_Card_FK FOREIGN KEY (card_id) REFERENCES public.Card(card_id) ON DELETE CASCADE
)WITHOUT OIDS;


------------------------------------------------------------
-- Table: MemberHasProject
------------------------------------------------------------
CREATE TABLE public.MemberHasProject(
	project_id                INT  NOT NULL ,
	member_id                 INT  NOT NULL ,
	memberHasProject_status   INT  NOT NULL  ,
	project_is_favorite       BOOL,
	CONSTRAINT MemberHasProject_PK PRIMARY KEY (project_id,member_id)

	,CONSTRAINT MemberHasProject_Project_FK FOREIGN KEY (project_id) REFERENCES public.Project(project_id) ON DELETE CASCADE
	,CONSTRAINT MemberHasProject_Member0_FK FOREIGN KEY (member_id) REFERENCES public.Member(member_id) ON DELETE CASCADE
)WITHOUT OIDS;


------------------------------------------------------------
-- Table: TeamHasMember
------------------------------------------------------------
CREATE TABLE public.TeamHasMember(
	team_id       INT  NOT NULL ,
	member_id     INT  NOT NULL ,
	team_status   INT  NOT NULL  ,
	CONSTRAINT TeamHasMember_PK PRIMARY KEY (team_id,member_id)

	,CONSTRAINT TeamHasMember_Team_FK FOREIGN KEY (team_id) REFERENCES public.Team(team_id) ON DELETE CASCADE
	,CONSTRAINT TeamHasMember_Member0_FK FOREIGN KEY (member_id) REFERENCES public.Member(member_id) ON DELETE CASCADE
)WITHOUT OIDS;


------------------------------------------------------------
-- Table: TeamHasProject
------------------------------------------------------------
CREATE TABLE public.TeamHasProject(
	project_id   INT  NOT NULL ,
	team_id      INT  NOT NULL ,
	thp_status   INT  NOT NULL  ,
	CONSTRAINT TeamHasProject_PK PRIMARY KEY (project_id,team_id)

	,CONSTRAINT TeamHasProject_Project_FK FOREIGN KEY (project_id) REFERENCES public.Project(project_id) ON DELETE CASCADE
	,CONSTRAINT TeamHasProject_Team0_FK FOREIGN KEY (team_id) REFERENCES public.Team(team_id) ON DELETE CASCADE
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

	,CONSTRAINT MemberHasPermissionTeam_Team_FK FOREIGN KEY (team_id) REFERENCES public.Team(team_id) ON DELETE CASCADE
	,CONSTRAINT MemberHasPermissionTeam_Permission0_FK FOREIGN KEY (permission_id) REFERENCES public.Permission(permission_id) ON DELETE CASCADE
	,CONSTRAINT MemberHasPermissionTeam_Member1_FK FOREIGN KEY (member_id) REFERENCES public.Member(member_id) ON DELETE CASCADE
)WITHOUT OIDS;

------------------------------------------------------------
-- Table: MemberHasAction
------------------------------------------------------------
CREATE TABLE public.MemberHasAction(
	action_id    INT  NOT NULL ,
	member_id    INT  NOT NULL ,
	mha_status   INT  NOT NULL  ,
	CONSTRAINT MemberHasAction_PK PRIMARY KEY (action_id,member_id)

	,CONSTRAINT MemberHasAction_Action_FK FOREIGN KEY (action_id) REFERENCES public.Action(action_id) ON DELETE CASCADE
	,CONSTRAINT MemberHasAction_Member0_FK FOREIGN KEY (member_id) REFERENCES public.Member(member_id) ON DELETE CASCADE
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

	,CONSTRAINT MemberHasPermissionProject_Permission_FK FOREIGN KEY (permission_id) REFERENCES public.Permission(permission_id) ON DELETE CASCADE
	,CONSTRAINT MemberHasPermissionProject_Project0_FK FOREIGN KEY (project_id) REFERENCES public.Project(project_id) ON DELETE CASCADE
	,CONSTRAINT MemberHasPermissionProject_Member1_FK FOREIGN KEY (member_id) REFERENCES public.Member(member_id) ON DELETE CASCADE
)WITHOUT OIDS;


------------------------------------------------------------
-- Table: CardHasLabel
------------------------------------------------------------
CREATE TABLE public.CardHasLabel(
	label_id     INT  NOT NULL ,
	card_id      INT  NOT NULL ,
	project_id   INT  NOT NULL  ,
	CONSTRAINT CardHasLabel_PK PRIMARY KEY (label_id,card_id,project_id)

	,CONSTRAINT CardHasLabel_Label_FK FOREIGN KEY (label_id) REFERENCES public.Label(label_id)
,CONSTRAINT CardHasLabel_Card0_FK FOREIGN KEY (card_id) REFERENCES public.Card(card_id) ON DELETE CASCADE
,CONSTRAINT CardHasLabel_Project1_FK FOREIGN KEY (project_id) REFERENCES public.Project(project_id) ON DELETE CASCADE
)WITHOUT OIDS;

------------------------------------------------------------
-- Table: MemberHasCard
------------------------------------------------------------
CREATE TABLE public.MemberHasCard(
	card_id     INT  NOT NULL ,
	member_id   INT  NOT NULL  ,
	CONSTRAINT MemberHasCard_PK PRIMARY KEY (card_id,member_id)

	,CONSTRAINT MemberHasCard_Card_FK FOREIGN KEY (card_id) REFERENCES public.Card(card_id) ON DELETE CASCADE
,CONSTRAINT MemberHasCard_Member0_FK FOREIGN KEY (member_id) REFERENCES public.Member(member_id) ON DELETE CASCADE
)WITHOUT OIDS;