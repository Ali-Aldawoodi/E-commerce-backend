const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', async (req, res) => {
  // find all tags
  // be sure to include its associated Product data
  try {
    const tagData = await Tag.findAll({
    include : [
      {model: Product},
      ]
    })
res.status(200).json(tagData);
  } catch (err) {
    res.status(500).json(err)
  }
});

router.get('/:id', async (req, res) => {
  // find a single tag by its `id`
  // be sure to include its associated Product data
  try {
    const tagData = await Tag.findOne({
      include: [
        {model: Product}
      ]
    })
    res.status(200).json(tagData)
  } catch {
    res.status(500).json(err)
  }
});

router.post('/', async (req, res) => {
  // create a new tag
  try {
    const tagData = await Tag.create(req.body, 
      {
        id: req.body.id
      });
      res.status(200).json(tagData)
  } catch (err) {
    res.status(500).json(err)
  }
});

// Do I need to put tag_id??
router.put('/:id', (req, res) => {
  // update a tag's name by its `id` value
  ProductTag.update(
    {
      tag_id: req.body.tag_id
    },
    {
      where: {
        tag_id: req.params.tag_id,
      },
    }
  )
    .then((updatedTag) => {
      res.json(updatedTag)
    })
    .catch((err) => {
      console.log(err);
      res.json(err);
    });
});

router.delete('/:id', (req, res) => {
  // delete on tag by its `id` value

  ProductTag.destroy({
    where: {
      id: req.params.id,
    },
  })
    .then((deletedTag) => {
      res.json(deletedTag);
    })
    .catch((err) => res.json(err));
});

module.exports = router;
