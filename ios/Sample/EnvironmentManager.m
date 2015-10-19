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
  NSString *locale = [[NSLocale currentLocale] localeIdentifier];
  locale = [locale stringByReplacingOccurrencesOfString:@"_" withString:@"-"];
  
  NSNumber * simulator = @NO;
  NSString * version = [[[NSBundle mainBundle] infoDictionary] objectForKey:@"CFBundleShortVersionString"];
  NSString * buildCode = [[NSBundle mainBundle] objectForInfoDictionaryKey:(NSString *)kCFBundleVersionKey];
  
  NSString * envName = kEnvironment;
  NSDictionary *passed = [[NSProcessInfo processInfo] environment];
  NSString *override = [passed valueForKey:@"SAMPLE_ENV"];
  if (override) {
    envName = override;
  }
#ifdef TEST_ENVIRONMENT
  envName = @"test";
#endif
#ifdef STAGING_ENVIRONMENT
  envName = @"staging";
#endif
  
  
#if TARGET_IPHONE_SIMULATOR
  simulator = @YES;
#endif
  
  callback(@[ @{
                @"name": envName,
                @"buildCode": buildCode,
                @"simulator": simulator,
                @"version": version,
                @"locale": locale
                }]);
}

@end
