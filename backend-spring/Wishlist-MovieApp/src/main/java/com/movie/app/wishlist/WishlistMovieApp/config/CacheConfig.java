//package com.movie.app.wishlist.WishlistMovieApp.config;
//
//import org.ehcache.config.CacheConfiguration;
//import org.ehcache.config.builders.CacheConfigurationBuilder;
//import org.ehcache.config.builders.ExpiryPolicyBuilder;
//import org.ehcache.config.builders.ResourcePoolsBuilder;
//import org.ehcache.config.units.MemoryUnit;
//import org.ehcache.jsr107.Eh107Configuration;
//import org.springframework.cache.CacheManager;
//import org.springframework.cache.annotation.EnableCaching;
//import org.springframework.cache.jcache.JCacheCacheManager;
//import org.springframework.context.annotation.Bean;
//import org.springframework.context.annotation.Configuration;
//
//import javax.cache.spi.CachingProvider;
//;
//
//@Configuration
//@EnableCaching
//public class CacheConfig {
//    @Bean
//    public CacheManager getCacheManager() {
//        CachingProvider cachingProvider = javax.cache.Caching.getCachingProvider();
//        javax.cache.CacheManager cacheManager = cachingProvider.getCacheManager();
//
//        CacheConfiguration<Long, BigDecimal> cacheConfiguration =
//                CacheConfigurationBuilder
//                        .newCacheConfigurationBuilder(Long.class, BigDecimal.class,
//                                ResourcePoolsBuilder.heap(100).offheap(10, MemoryUnit.MB))
//                        .withExpiry(ExpiryPolicyBuilder.timeToLiveExpiration(java.time.Duration.ofSeconds(300)))
//                        .build();
//        javax.cache.configuration.Configuration<Long, BigDecimal> eh107Configuration =
//                Eh107Configuration.fromEhcacheCacheConfiguration(cacheConfiguration);
//        cacheManager.createCache("cache", eh107Configuration);
//        return new JCacheCacheManager(cacheManager);
//    }
//}
