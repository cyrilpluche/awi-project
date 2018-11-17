import React, { Component } from 'react';
import List from './List'
import { withStyles } from '@material-ui/core/styles';
import { Droppable } from 'react-beautiful-dnd';
import AddIcon from '@material-ui/icons/Add';
import Button from '@material-ui/core/Button';
import { styles } from './Style'
import SimpleDialog from '../../ui/dialog/SimpleDialog'
import Grid from "@material-ui/core/Grid/Grid";




class Lists extends Component {
    constructor(props){
        super(props)
        this.state = {
            newListname:'',
            open: false,
        }
    }


    createNewList(){
        let listName = this.state.newListname
        let idProject = this.props.idProject
        if(listName) this.props.createListCallback(listName,idProject)
    }


    handleChange = name => event => {
        this.setState({
            [name]: event.target.value,
        });

    };

    handleClickOpen = () => {
        this.setState({
            open: true,
        });
    };

    handleClose = (value) => {
        this.setState({ newListname: value, open: false }, function(){  this.createNewList()});
    };




    render() {
        const { classes,lists,idProject} = this.props;

        return (

            <Droppable droppableId="allList" direction="horizontal" type="LIST">
                {(provided) =>(
                    <div
                        className={ classes.widthMax }
                        ref={provided.innerRef}
                        {...provided.droppableProps}
                    >
                        <Grid container justify='flex-start' className={ classes.buttonAddList }>
                            <Button
                                onClick={this.handleClickOpen}
                                variant="outlined"
                                color='primary'
                                aria-label="Add"
                                className={classes.buttonList}
                            >
                                <AddIcon />
                                New list
                            </Button>
                        </Grid>
                        <Grid container id='listScroll' className={classes.listArea}>
                            {lists.length === 0 ? '' :lists.filter(list => list.listStatus === 0).map((list, index) =>
                                <Grid item key={list.listTitle+list.listId}>
                                    <List
                                        idProject={idProject}
                                        list={list}
                                        listIndex={index}
                                        index={index}
                                        deleteList = {this.props.deleteList}
                                        updateListTitle = {this.props.updateListTitle}
                                        archiveList = {this.props.archiveList}
                                        createCard = {this.props.createCard}
                                        member={this.props.member}
                                        route = {this.props.route}
                                    />
                                </Grid>
                            )}
                            {provided.placeholder}
                            <SimpleDialog
                                type="list"
                                open={this.state.open}
                                onClose={this.handleClose}
                            />
                        </Grid>
                    </div>
                )}

            </Droppable>
        )
    }
}




export default withStyles(styles)(Lists)