import React, { Component } from 'react';
import List from './List'
import { withStyles } from '@material-ui/core/styles';
import { Droppable } from 'react-beautiful-dnd';
import AddIcon from '@material-ui/icons/Add';
import Button from '@material-ui/core/Button';
import { styles } from './Style'
import SimpleDialog from '../../ui/dialog/SimpleDialog'
import MiniLoader from "../../ui/loader/MiniLoader";
import connect from "react-redux/es/connect/connect";
import _action from "../../../actions";




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
                    <div className={classes.listArea}
                        ref={provided.innerRef} 
                        {...provided.droppableProps}>
                        {lists.length === 0 ? '' :lists.filter(list => list.listStatus === 0).map((list, index) => 
                            <div key={list.listTitle+list.listId}>
                                { this.props.isLoading ? (
                                    <MiniLoader/>
                                ) : (
                                    <List
                                    idProject={idProject}
                                    key={list.listTitle+list.listId}
                                    list={list}
                                    listIndex={index}
                                    index={index}
                                    />
                                )}
                            </div>
                            )}
                        {provided.placeholder}
                        <div>
                            <Button onClick={this.handleClickOpen} variant="fab"  aria-label="Add" className={classes.buttonList}>
                                <AddIcon />
                            </Button>
                        </div>
                        <SimpleDialog
                            type="list"
                            open={this.state.open}
                            onClose={this.handleClose}
                        />
                        
                    </div>
                )}
                
            </Droppable>         
        )
    }
}

const mapStateToProps = (state) => ({
    isLoading: state.project.isLoading
})
const mapDispatchToProps = {
};

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(Lists));