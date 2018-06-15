
// Description:
//   yubibot
//
// Author:
//   @firstlookmedia

'use strict'


const { WebClient } = require('@slack/client') ;

if (process.env.NODE_ENV !== 'production') {
  require('dotenv').load();
}

const YUBIBOT_REACTION_NAME = process.env.YUBIBOT_REACTION_NAME || 'key' ;

module.exports = (robot) => {

  const is_slack = ( robot.adapterName === 'slack' ) ;

  let web ;

  if ( is_slack ) {
    web = new WebClient( robot.adapter.options.token ) ;
  }

  robot.logger.info( `[yubibot] adapter: ${robot.adapterName}; is_slack: ${is_slack}` ) ;

  //
  robot.hear( /(^|\W)ccc\w{41}(\W|$)/i, (res) => {

    if ( is_slack )
    {
      robot.logger.info( `[yubibot] heard yubikey: channel: ${res.message.rawMessage.channel}` ) ;
      web.reactions.add({
        name: YUBIBOT_REACTION_NAME,
        channel: res.message.rawMessage.channel,
        timestamp: res.message.rawMessage.ts
      })
      .catch( err => robot.logger.error( err ) )
    }
    else
    {
      res.reply( `yubikey!` )
    }
  })

}
