using Kjac.HeadlessPreview.Services;
using Server.Services;
using Umbraco.Cms.Core.Composing;

namespace Server.Composing;

public class BlogDocumentPreviewServiceComposer : IComposer
{
    public void Compose(IUmbracoBuilder builder)
        => builder.Services.AddUnique<IDocumentPreviewService, BlogDocumentPreviewService>();
}