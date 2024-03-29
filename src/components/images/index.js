import React from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'

const CarouselContainer = styled.div`
  display: flex;
  flex-direction: row;
  margin-left: auto;
  margin-right: auto;
  margin-top: 1.5em;
  margin-bottom: 1.5em;
`

const SliderOuter = styled.div`
  overflow: hidden;
  height: ${props => props.height}px;
  width: ${props => props.width}px;
`
const SliderInner = styled.div`
  display: block;
  position: relative;
  width: ${props => props.children.length * props.width}px;
  left: -${props => props.width * props.index - props.width}px;
  transition: left 1s;
  > img {
    float: left;
  }
`

const Button = styled.button`
  border: none;
  background: none;
  outline: none;
  padding: 1em;
  :active,
  :hover {
    text-decoration: underline;
  }
`

export default class Carousel extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      index: 1,
      width: props.initialWidth,
      height: props.initialHeight
    }
    this.next = this.next.bind(this)
    this.prev = this.prev.bind(this)
  }

  next() {
    this.setState(prevState => {
      const nextIndex = prevState.index + 1
      return {
        ...prevState,
        index: nextIndex > this.props.children.length ? 1 : nextIndex
      }
    })
  }

  prev() {
    this.setState(prevState => {
      const nextIndex = prevState.index - 1
      return {
        ...prevState,
        index: nextIndex < 1 ? this.props.children.length : nextIndex
      }
    })
  }

  render() {
    const { width, height, index } = this.state

    return (
      <CarouselContainer>
        <Button onClick={this.prev}>Previous</Button>
        <SliderOuter width={width} height={height}>
          <SliderInner width={width} index={index}>
            {this.props.children.map((el, i) => (
              <img
                key={`img${i}`}
                src={el.props.src}
                width={width}
                height={height}
              />
            ))}
          </SliderInner>
        </SliderOuter>
        <Button onClick={this.next}>Next</Button>
      </CarouselContainer>
    )
  }
}

Carousel.propTypes = {
  initialWidth: PropTypes.string,
  initialHeight: PropTypes.string,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ]).isRequired
}
