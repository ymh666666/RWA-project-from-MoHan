// 替换原有的 POST 路由
app.post('/api/admin/assets', isAdmin, (req, res) => {
  const assets = readJSON(ASSETS_FILE);
  let newId = req.body.id;
  // 如果传入了 ID 且不重复，则使用；否则自动生成
  if (newId && !assets.some(a => a.id === newId)) {
    // 使用传入的 ID
  } else if (newId && assets.some(a => a.id === newId)) {
    return res.status(400).json({ error: '资产 ID 已存在' });
  } else {
    newId = getNextAssetId();
  }
  const newAsset = { ...req.body, id: newId };
  assets.push(newAsset);
  writeJSON(ASSETS_FILE, assets);
  res.json(newAsset);
});