/**
 * The examples provided by Facebook are for non-commercial testing and
 * evaluation purposes only.
 *
 * Facebook reserves all rights not expressly granted.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
 * OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NON INFRINGEMENT. IN NO EVENT SHALL
 * FACEBOOK BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN
 * AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN
 * CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 *
 * @flow
 */
'use strict';

var React = require('react-native');
var {
  Image,
  PixelRatio,
  ScrollView,
  StyleSheet,
  Text,
  View,
  LinkingIOS,
  AlertIOS,
} = React;

var getImageSource = require('./getImageSource');
var getStyleFromScore = require('./getStyleFromScore');
var getTextFromScore = require('./getTextFromScore');

var AlbumScreen = React.createClass({
  render: function() {
    return (
      <ScrollView contentContainerStyle={styles.contentContainer}>
        <View style={styles.mainSection}>
          <Image
            source={getImageSource(this.props.album, 'det')}
            style={styles.detailsImage}
          />
          <View style={styles.rightPane}>
            <Text style={styles.albumTitle}>{this.props.album.album}</Text>
            <Text style={styles.bandWrapper}>
              By <Text style={styles.band}>{this.props.album.band}</Text>
              {' '}&bull;{' '}
              <Text style={styles.year}>1996</Text>
            </Text>
            <Links links={this.props.album.links}/>
          </View>
        </View>
        <Stories stories={this.props.album.stories}/>
      </ScrollView>
    );
  },
});

var Stories = React.createClass({
  render: function() {
    var stories = this.props.stories;

    stories = stories.concat({
        history: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
        submitter: 'Nicolas'
    });

    if ( stories && stories.length > 0 )
    {
        return (
            <View style={styles.stories}>
            {stories.map(function(story, i){
               return (
                 <View key={"story-" + i}>
                   <View style={styles.separator} />
                   <View style={styles.story}>
                     <Text style={styles.storyText}>{story.history}</Text>
                     <Text style={styles.storySubmitter}>Shared by {story.submitter}</Text>
                   </View>
                 </View>);
             })}
          </View>
        );
    }
    else
    {
        return (
            <View>
                <Text>No story has been shared yet.</Text>
            </View>
        );
    }
  },
});

var Links = React.createClass({

  _open: function( url ) {
      try
      {
        LinkingIOS.openURL(url);
      }
      catch (e) {
        // AlertIOS.alert('Can\'t handle url: ' + url);
        console.log( e )
      }
  },

  render: function() {

    var links = {
        rdio: this.props.links[0],
        youtube: this.props.links[1]
    };

    if ( links )
    {
        return (
            <View style={styles.links}>
            {Object.keys(links).map(function(id){
               return (
                   <Text style={styles.link} key={id} onPress={this._open.bind(this, links[id])}>{id}</Text>
               );
           }, this)}
          </View>
        );
    }
    return null;
  },
});

var styles = StyleSheet.create({
  contentContainer: {
    padding: 10,
  },
  rightPane: {
    justifyContent: 'space-between',
    flex: 1,
  },
  albumTitle: {
    flex: 1,
    fontSize: 16,
    fontWeight: '500',
  },
  stories: {
    marginTop: 10,
  },
  storyText: {
    fontSize: 14,
  },
  storySubmitter: {
    fontSize: 10,
    marginBottom: 5,
    fontWeight: '300',
    color: '#666',
    textAlign: 'right'
  },
  mpaaWrapper: {
    alignSelf: 'flex-start',
    borderColor: 'black',
    borderWidth: 1,
    paddingHorizontal: 3,
    marginVertical: 5,
  },
  mpaaText: {
    fontFamily: 'Palatino',
    fontSize: 13,
    fontWeight: '500',
  },
  mainSection: {
    flexDirection: 'row',
  },
  detailsImage: {
    width: 134,
    height: 200,
    backgroundColor: '#eaeaea',
    marginRight: 10,
  },
  separator: {
    backgroundColor: 'rgba(0, 0, 0, 0.1)',
    height: 1 / PixelRatio.get(),
    marginVertical: 10
  },
  bandWrapper: {
    marginTop: 20,
  },
  band: {
    fontWeight: '500',
    marginBottom: 3,
  },
  links: {
    marginTop: 20,
  },
  link: {
    color: '#007AFF',
  }
});

module.exports = AlbumScreen;
