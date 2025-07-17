export default async function testPaymentModuleContainer({ container }: any) {
  const logger = container.resolve("logger")
  
  logger.info('=== Testing Payment Module Container with NPM Package Approach ===')
  
  try {
    // Test 1: Check if payment module is available
    logger.info('Testing payment module availability...')
    const paymentModuleService = container.resolve("payment")
    logger.info('✅ Payment module service resolved:', !!paymentModuleService)
    
    // Test 2: Try to list available providers
    logger.info('Attempting to list available providers...')
    try {
      const providers = await paymentModuleService.listPaymentProviders()
      logger.info('Available payment providers:', providers)
    } catch (error) {
      logger.error('Error listing providers:', error.message)
    }
    
    // Test 3: Try to retrieve GiyaPay provider specifically
    logger.info('Testing GiyaPay provider retrieval...')
    try {
      const giyaPayProvider = await paymentModuleService.retrieveProvider('giyapay')
      logger.info('✅ GiyaPay provider found:', !!giyaPayProvider)
      logger.info('GiyaPay provider details:', giyaPayProvider)
    } catch (error) {
      logger.error('❌ GiyaPay provider NOT found:', error.message)
    }
    
    // Test 4: Try with pp_ prefix
    logger.info('Testing with pp_giyapay identifier...')
    try {
      const giyaPayProvider = await paymentModuleService.retrieveProvider('pp_giyapay')
      logger.info('✅ pp_giyapay provider found:', !!giyaPayProvider)
      logger.info('pp_giyapay provider details:', giyaPayProvider)
    } catch (error) {
      logger.error('❌ pp_giyapay provider NOT found:', error.message)
    }
    
    // Test 5: Try with full identifier pattern
    logger.info('Testing with pp_giyapay_giyapay identifier...')
    try {
      const giyaPayProvider = await paymentModuleService.retrieveProvider('pp_giyapay_giyapay')
      logger.info('✅ pp_giyapay_giyapay provider found:', !!giyaPayProvider)
      logger.info('pp_giyapay_giyapay provider details:', giyaPayProvider)
    } catch (error) {
      logger.error('❌ pp_giyapay_giyapay provider NOT found:', error.message)
    }
    
    // Test 6: Check available provider IDs
    logger.info('Checking all available provider IDs...')
    try {
      if (paymentModuleService.listProviders) {
        const allProviders = await paymentModuleService.listProviders()
        logger.info('All registered providers:', allProviders)
      }
    } catch (error) {
      logger.error('Error checking provider IDs:', error.message)
    }
    
    logger.info('=== NPM Package Approach Test Complete ===')
    
  } catch (error) {
    logger.error('Error testing payment module container:', error)
  }
} 