//
//  TestRunnerManager.m
//  Tasker
//
//  Created by Brian Leonard on 8/9/15.
//  Copyright (c) 2015 TaskRabbit. All rights reserved.
//

#import "RCTBridgeModule.h"
#import "RCTBridge.h"

@interface TestRunnerManager : NSObject <RCTBridgeModule>

@end


@implementation TestRunnerManager

RCT_EXPORT_MODULE()

RCT_EXPORT_METHOD(reset:(RCTResponseSenderBlock)callback)
{
  // delete all data in documents directory
  NSString *folderPath = [NSSearchPathForDirectoriesInDomains(NSDocumentDirectory, NSUserDomainMask, YES) objectAtIndex:0];
  NSError *error = nil;
  for (NSString *file in [[NSFileManager defaultManager] contentsOfDirectoryAtPath:folderPath error:&error]) {
    // If you want to skip certain files
    if ([file containsString:@".skip"]) {
      // but be sure to clear them out if applicable from your js code
      continue;
    }
    
    // otherwise, delete
    [[NSFileManager defaultManager] removeItemAtPath:[folderPath stringByAppendingPathComponent:file] error:&error];
  }

  // reload the app
  [[NSNotificationCenter defaultCenter] postNotificationName:RCTReloadNotification object:nil userInfo:nil];

  callback(@[]);
}

@end
