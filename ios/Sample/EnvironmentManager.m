//
//  EnvironmentManager.m
//  Sample
//

#import "RCTBridgeModule.h"

@interface EnvironmentManager : NSObject <RCTBridgeModule>

@end


@implementation EnvironmentManager

RCT_EXPORT_MODULE()

RCT_EXPORT_METHOD(get:(RCTResponseSenderBlock)callback)
{
  //TODO: NSString * envName = kEnvironment;
  NSString * envName = @"debug";
  NSDictionary *passed = [[NSProcessInfo processInfo] environment];
  NSString *override = [passed valueForKey:@"SAMPLE_ENV"];
  if (override) {
    envName = override;
  }
#ifdef TEST_ENVIRONMENT
  envName = @"test";
#endif
  callback(@[envName]);
}

@end
