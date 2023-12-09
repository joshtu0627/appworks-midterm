# README

## Link

http://13.236.23.10:8000/admin/dashboard.html

## Performance analysis

### Data processing time

| Data processing    | no cached time (ms) | cached time (ms) | no cached memory used (MB) | cached memory used (MB) | data sent to browser |
| ------------------ | ------------------- | ---------------- | -------------------------- | ----------------------- | -------------------- |
| revenue            | 417                 | 0                | 8                          | 0                       | 292B                 |
| get top 5 products | 40                  | 0                | 5                          | 2                       | 578B                 |
| aggregate price    | 142                 | 47               | 2                          | 2                       | 3.0kB                |
| aggregate color    | 155                 | 70               | 2                          | 0                       | 447B                 |

我使用了 node-cache 來做 caching，所以在第一次執行時會較慢，但之後就會快非常多。

我的優化策略是盡量使用 sql 的 aggregate function 以及 SUM，而不是在 nodejs 才做處理，所以我把每筆交易中所有被購買的 product 存成以下格式。

```
id, product_id, color, price, size, qty
```

這樣在聚合 color 以及 size 時可以直接使用相對較快的 sql aggregate function。
