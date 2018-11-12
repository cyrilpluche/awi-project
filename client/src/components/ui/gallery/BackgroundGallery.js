import Gallery from 'react-grid-gallery';
import React from 'react'
import {connect} from "react-redux";
import PropTypes from 'prop-types';
import { style } from './Style'
import { withStyles } from '@material-ui/core/styles';
import { Scrollbars } from 'react-custom-scrollbars';
import _action from "../../../actions";

const IMAGES =
    [
        {
            src: "https://res.cloudinary.com/o1-g1-prello/image/upload/v1541640885/prello%20project/architectural-design-architecture-building-340151.jpg",
            thumbnail: "https://res.cloudinary.com/o1-g1-prello/image/upload/v1541640879/prello%20project/pexels-photo-340151.jpg",
            thumbnailWidth: 5,
            thumbnailHeight: 5,
            isSelected: false
        },
        {
            src: "https://res.cloudinary.com/o1-g1-prello/image/upload/v1541640689/prello%20project/asphalt-bitumen-black-1038935.jpg",
            thumbnail: "https://res.cloudinary.com/o1-g1-prello/image/upload/v1541640681/prello%20project/pexels-photo-1038935.jpg",
            thumbnailWidth: 5,
            thumbnailHeight: 5,
            isSelected: false
        },
        {
            src: "https://res.cloudinary.com/o1-g1-prello/image/upload/v1541640600/prello%20project/blank-board-close-up-415102.jpg",
            thumbnail: "https://res.cloudinary.com/o1-g1-prello/image/upload/v1541640596/prello%20project/pexels-photo-415102.jpg",
            thumbnailWidth: 5,
            thumbnailHeight: 5,
            isSelected: false
        },
        {
            src: "https://res.cloudinary.com/o1-g1-prello/image/upload/v1541640409/prello%20project/apple-magic-keyboard-coffee-desk-162616_1.jpg",
            thumbnail: "https://res.cloudinary.com/o1-g1-prello/image/upload/v1541640390/prello%20project/coffee-work-desk-mug-keyboard-162616.jpg",
            thumbnailWidth: 5,
            thumbnailHeight: 5,
            isSelected: false
        },
        {
            src: "https://res.cloudinary.com/o1-g1-prello/image/upload/v1541639441/prello%20project/apple-background-connection-399161.jpg",
            thumbnail: "https://res.cloudinary.com/o1-g1-prello/image/upload/v1541640333/prello%20project/pexels-photo-399161_1.jpg",
            thumbnailWidth: 5,
            thumbnailHeight: 5,
            isSelected: false
        },
        {
            src: "https://res.cloudinary.com/o1-g1-prello/image/upload/v1541633923/prello%20project/3.jpg",
            thumbnail: "https://res.cloudinary.com/o1-g1-prello/image/upload/v1541633917/prello%20project/3_thumbnail.jpg",
            thumbnailWidth: 5,
            thumbnailHeight: 5,
            isSelected: false
        },
        {
            src: "https://res.cloudinary.com/o1-g1-prello/image/upload/v1541633860/prello%20project/2.jpg",
            thumbnail: "https://res.cloudinary.com/o1-g1-prello/image/upload/v1541633854/prello%20project/2_thumbnail.jpg",
            thumbnailWidth: 5,
            thumbnailHeight: 5,
            isSelected: false
        },

        {
            src: "https://res.cloudinary.com/o1-g1-prello/image/upload/v1541633775/prello%20project/1.jpg",
            thumbnail: "https://res.cloudinary.com/o1-g1-prello/image/upload/v1541633767/prello%20project/1_thumbnail.jpg",
            thumbnailWidth: 5,
            thumbnailHeight: 5,
            isSelected: false
        },
        {
            src: 'https://res.cloudinary.com/o1-g1-prello/image/upload/v1541635388/prello%20project/background-bloom-blooming-583850.jpg',
            thumbnail:'https://res.cloudinary.com/o1-g1-prello/image/upload/v1541635382/prello%20project/pexels-photo-583850.jpg',
            thumbnailWidth: 5,
            thumbnailHeight: 5,
            isSelected: false
        }

    ]

class BackgroundGallery extends React.Component {
    constructor (props) {
        super(props)

        this.clickOnImg = this.clickOnImg.bind(this)
        this.state = {
            images: IMAGES
        }
    }

    clickOnImg (e) {
        let img = this.state.images;
        for (let i = 0; i < img.length; i++) {
            if (i !== e)
                img[i].isSelected = false
            else
                img[e].isSelected = !img[e].isSelected;
        }
        // todo dispatch the image
        this.setState({images: img})

    }

    render () {

        return (
            <Scrollbars style={{ width: 500, height: 80, background:'#ebebe0' }}>
                <Gallery images={this.state.images} onClickThumbnail={this.clickOnImg}
                         onSelectImage={this.clickOnImg}
                         rowHeight={80}/>
            </Scrollbars>

        )
    }
}

BackgroundGallery.propTypes = {
    classes: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({

})

const mapDispatchToProps = {

}

export default connect(mapStateToProps,mapDispatchToProps)(withStyles(style)(BackgroundGallery));