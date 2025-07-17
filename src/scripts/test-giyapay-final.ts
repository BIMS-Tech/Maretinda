export default async function testGiyaPayFinal({ container }: any) {
  const logger = container.resolve("logger")
  
  logger.info('🧪 === Final GiyaPay Auto-Discovery Test ===')
  
  try {
    // Test 1: Check if payment module is available
    logger.info('1️⃣ Testing payment module availability...')
    const paymentModuleService = container.resolve("payment")
    logger.info('✅ Payment module service resolved')
    
    // Test 2: Try to retrieve GiyaPay provider
    logger.info('2️⃣ Testing GiyaPay provider retrieval...')
    try {
      const giyaPayProvider = await paymentModuleService.retrieveProvider('pp_giyapay')
      logger.info('🎉 SUCCESS: GiyaPay provider found with pp_giyapay!')
      logger.info('Provider details:', giyaPayProvider)
      return true
    } catch (error) {
      logger.warn('❌ pp_giyapay not found:', error.message)
    }
    
    // Test 3: Try alternative identifier
    logger.info('3️⃣ Testing with giyapay identifier...')
    try {
      const giyaPayProvider = await paymentModuleService.retrieveProvider('giyapay')
      logger.info('🎉 SUCCESS: GiyaPay provider found with giyapay!')
      logger.info('Provider details:', giyaPayProvider)
      return true
    } catch (error) {
      logger.warn('❌ giyapay not found:', error.message)
    }
    
    // Test 4: List all available providers
    logger.info('4️⃣ Listing all available providers...')
    try {
      const providers = await paymentModuleService.listPaymentProviders()
      logger.info('📋 Available providers:', providers)
    } catch (error) {
      logger.warn('Error listing providers:', error.message)
    }
    
    // Test 5: Check if service is registered in main container
    logger.info('5️⃣ Checking if GiyaPayPaymentProviderService is in main container...')
    try {
      const giyaPayService = container.resolve('giyaPayPaymentProviderService')
      logger.info('✅ GiyaPayPaymentProviderService found in main container')
      logger.info('Service identifier:', giyaPayService.constructor.identifier)
    } catch (error) {
      logger.warn('❌ GiyaPayPaymentProviderService not found in main container:', error.message)
    }
    
    logger.info('🏁 === Final Test Complete ===')
    return false
    
  } catch (error) {
    logger.error('💥 Error in final test:', error)
    return false
  }
} 