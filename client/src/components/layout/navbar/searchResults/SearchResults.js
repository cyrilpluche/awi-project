import React from 'react';
import PropTypes from 'prop-types';
import deburr from 'lodash/deburr';
import Downshift from 'downshift';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';
import MenuItem from '@material-ui/core/MenuItem';
import { style } from './Style'
import connect from "react-redux/es/connect/connect";
import _action from "../../../../actions";
import Typography from "@material-ui/core/Typography/Typography";
import Divider from "@material-ui/core/Divider/Divider";

class SearchResults extends React.Component {

    constructor (props) {
        super(props)
        this.fetchSuggestions = this.fetchSuggestions.bind(this)
        this.getSuggestions = this.getSuggestions.bind(this)
        this.setWrapperRef = this.setWrapperRef.bind(this);
        this.handleClickOutside = this.handleClickOutside.bind(this);
        this.renderSuggestion = this.renderSuggestion.bind(this)
        this.renderSuggestion.propTypes = {
            highlightedIndex: PropTypes.number,
            index: PropTypes.number,
            itemProps: PropTypes.object,
            selectedItem: PropTypes.string,
            suggestion: PropTypes.shape({ label: PropTypes.string }).isRequired,
        };
        this.state = ({
            searchInput: '',
            isOpen: false
        })
    }

    componentDidMount() {
        document.addEventListener('mousedown', this.handleClickOutside);
    }

    componentWillUnmount() {
        document.removeEventListener('mousedown', this.handleClickOutside);
    }

    renderSuggestion({ suggestion, index, itemProps, highlightedIndex, selectedItem, type }) {
        const isSelected = (selectedItem || '').indexOf(suggestion.label) > -1;
        const id = type + '/' + suggestion.id
        const { classes } = this.props;

        return (
            <MenuItem
                {...itemProps}
                key={id}
                id={id}
                className={ classes.highlight }
                onClick={this.handleClickSuggestion}
                component="div"
                style={{
                    fontWeight: isSelected ? 500 : 400,
                }}
            >

                {suggestion.label}
            </MenuItem>
        );
    }

    fetchSuggestions = (event) => {
        var { name, value } = event.target;
        this.setState({ [name]: value });

        this.props.onSearchProjects(value)
        this.props.onSearchLists(value)
        this.props.onSearchCards(value)
    }

    /**
     * Set the wrapper ref for the click outside handler
     */
    setWrapperRef(node) {
        this.wrapperRef = node;
    }

    /**
     * Alert if clicked on outside of element
     */
    handleClickOutside(event) {
        if (this.wrapperRef && !this.wrapperRef.contains(event.target)) {
            this.setState({ isOpen: false })
        } else {
            this.setState({ isOpen: true })
        }
    }

    getSuggestions(value, array) {
        const inputValue = deburr(value.trim());
        const inputValueLower = inputValue.toLowerCase();
        const inputValueCapitalize = inputValue.charAt(0).toUpperCase() + inputValue.slice(1);

        const inputLength = inputValue.length;

        console.log(inputValue)

        let count = 0;

        return inputLength === 0
            ? []
            : array.filter(suggestion => {
                const keep =
                    count < 5 && ( suggestion.label.includes(inputValue) ||
                    suggestion.label.includes(inputValueLower) ||
                    suggestion.label.includes(inputValueCapitalize)
                    );

                if (keep) {
                    count += 1;
                }
                return keep;
            });
    }

    handleClickSuggestion (event) {
        console.log(event.target.id)
    }

    render() {

        const { classes } = this.props;
        return (
            <div className={classes.root} ref={this.setWrapperRef}>
                <Downshift id="downshift-simple">
                    {({
                          getInputProps,
                          getItemProps,
                          getMenuProps,
                          highlightedIndex,
                          inputValue,
                          isOpen,
                          selectedItem,
                      }) => (
                        <div className={classes.container}>
                            <TextField
                                InputProps={{
                                    classes: {
                                        root: classes.inputRoot,
                                        input: classes.inputInput,
                                    }
                                }}
                                required
                                id='searchInput'
                                name="searchInput"
                                fullWidth
                                onChange={this.fetchSuggestions}
                                value={this.state.searchInput}
                            />
                            <div {...getMenuProps()}>
                                {this.state.isOpen ? (
                                    <Paper className={classes.paper} square>
                                        {this.props.projects.length > 0 ?(
                                            <div>
                                                <div id='label' className={classes.labelSearchTitle}>
                                                    <Typography variant="overline" >
                                                        Projects
                                                    </Typography>
                                                </div>
                                                <Divider/>
                                                {this.getSuggestions(this.state.searchInput, this.props.projects).map((suggestion, index) => {
                                                        return this.renderSuggestion({
                                                            suggestion,
                                                            index,
                                                            itemProps: getItemProps({item: suggestion.label}),
                                                            highlightedIndex,
                                                            selectedItem,
                                                            type: 'project'
                                                        })
                                                    }
                                                )}
                                                <Divider/>
                                            </div>
                                        ) : null}

                                        {this.props.lists.length > 0 ?(
                                            <div>
                                                <div id='label' className={classes.labelSearchTitle}>
                                                    <Typography variant="overline" >
                                                        Lists
                                                    </Typography>
                                                </div>
                                                <Divider/>
                                                {this.getSuggestions(this.state.searchInput, this.props.lists).map((suggestion, index) => {
                                                        return this.renderSuggestion({
                                                            suggestion,
                                                            index,
                                                            itemProps: getItemProps({item: suggestion.label}),
                                                            highlightedIndex,
                                                            selectedItem,
                                                            type: 'list'
                                                        })
                                                    }
                                                )}
                                                <Divider/>
                                            </div>
                                        ) : null}

                                        {this.props.cards.length > 0 ?(
                                            <div>
                                                <div id='label' className={classes.labelSearchTitle}>
                                                    <Typography variant="overline" >
                                                        Cards
                                                    </Typography>
                                                </div>
                                                <Divider/>
                                                {this.getSuggestions(this.state.searchInput, this.props.cards).map((suggestion, index) => {
                                                        return this.renderSuggestion({
                                                            suggestion,
                                                            index,
                                                            itemProps: getItemProps({item: suggestion.label}),
                                                            highlightedIndex,
                                                            selectedItem,
                                                            type: 'card'
                                                        })
                                                    }
                                                )}
                                            </div>
                                        ) : null}
                                    </Paper>
                                ) : null}
                            </div>
                        </div>
                    )}
                </Downshift>
            </div>
        );
    }
}

SearchResults.propTypes = {
    classes: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
    projects: state.searchbar.projectsFound,
    lists: state.searchbar.listsFound,
    cards: state.searchbar.cardsFound
})
const mapDispatchToProps = {
    onSearchProjects : _action.searchbarAction.searchProjects,
    onSearchLists : _action.searchbarAction.searchLists,
    onSearchCards : _action.searchbarAction.searchCards
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(style)(SearchResults));