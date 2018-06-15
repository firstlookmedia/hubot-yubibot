
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

  robot.logger.info( `yubibot: robot.adapterName: ${robot.adapterName}` ) ;

  const is_slack = ( robot.adapterName === 'slack' ) ;

  let web ;

  if ( is_slack ) {
    web = new WebClient( robot.adapter.options.token ) ;
  }
  else {
    robot.logger.info( `disabling yubibot; requires the slack adapter, adapter: ${robot.adapterName}` ) ;
    return {}
  }

  //
  robot.hear( /(^|\W)ccc\w{41}(\W|$)/i, (res) => {
    robot.logger.info( `heard yubikey: channel: ${res.message.rawMessage.channel}` ) ;

    if ( is_slack )
    {
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
