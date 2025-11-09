# Feature Request: Per-Page Height Control for neodigm-carousel

## Summary

This feature request proposes adding **per-page height control** to the neodigm-carousel component to allow developers to specify custom height behavior for individual carousel pages via a data attribute.

## Problem Statement

Currently, the neodigm-carousel calculates a single container height based on the tallest page content and applies it uniformly to all pages using `display: grid` with `align-content: center`. This creates issues when:

1. **Mixed content heights**: Some pages need fixed viewport height (e.g., auth/login screens at exactly 100vh) while others need natural scrollable height (e.g., long-form content)
2. **Vertical centering artifacts**: Short pages get vertically centered within the tall container, creating unwanted scrollable "black space" above and below
3. **UX inconsistency**: Authentication flows appear unprofessional with visible empty space, breaking the immersive full-screen design

### Real-World Use Case

In our application (BMAC Tournament Admin), we have:
- **Auth pages** (splash, signin, signout) that should be exactly 100vh with no scrolling
- **Admin dashboard** (tournament management) with extensive forms/tables requiring natural scrolling
- The current carousel forces all pages to share the height of the tallest page, causing auth pages to have significant black space above/below

## Proposed Solution

Add support for a `data-n55-carousel-height` attribute with three modes:

### 1. Viewport Mode (`data-n55-carousel-height="viewport"`)
- Container fixed at 100vh
- Content aligned to start (no vertical centering)
- No padding or gaps
- Overflow hidden
- **Use case**: Full-screen auth pages, landing pages, immersive content

### 2. Auto Mode (`data-n55-carousel-height="auto"`)
- Natural content height
- Content aligned to start
- Normal scrolling enabled
- **Use case**: Long-form content, admin dashboards, articles

### 3. Default Mode (no attribute)
- Current behavior preserved
- Grid layout with `align-content: center`
- **Use case**: Backward compatibility, general carousel use

## Implementation

### JavaScript Changes

**File**: `dist/neodigm55__v4_1.js`
**Location**: `NeodigmCarousel.nav()` method, after navigation completes

```javascript
// Dynamic height control based on active page
let activePage = oState.aTabCntr[ (oState.nIdx - 1) ];
let heightMode = activePage.dataset?.n55CarouselHeight;
if (heightMode === 'viewport') {
    // Viewport mode: 100vh, no centering
    elNCCntr.style.minHeight = '100vh';
    elNCCntr.style.maxHeight = '100vh';
    elNCCntr.style.alignContent = 'start';
    elNCCntr.style.padding = '0';
    elNCCntr.style.gap = '0';
} else if (heightMode === 'auto') {
    // Auto mode: natural height
    elNCCntr.style.minHeight = 'auto';
    elNCCntr.style.maxHeight = 'none';
    elNCCntr.style.alignContent = 'start';
} else {
    // Default: restore original grid centering
    elNCCntr.style.minHeight = '';
    elNCCntr.style.maxHeight = '';
    elNCCntr.style.alignContent = 'center';
    elNCCntr.style.padding = '8px';
    elNCCntr.style.gap = '8px';
}
```

**Insert location**: After line 1781 (`elNCCntr.style.marginLeft = ( nSP ) - ( nSP * 2 ) + "px"`)

### Usage Example

```html
<neodigm-carousel id="main_caro">
    <section>
        <!-- Auth page: Fixed viewport height, no black space -->
        <section data-n55-carousel-page-name="login" data-n55-carousel-height="viewport">
            <div class="auth-page">
                <!-- Login form content -->
            </div>
        </section>

        <!-- Dashboard: Natural scrolling height -->
        <section data-n55-carousel-page-name="dashboard" data-n55-carousel-height="auto">
            <div class="dashboard">
                <!-- Long-form dashboard content -->
            </div>
        </section>

        <!-- Standard page: Default carousel behavior -->
        <section data-n55-carousel-page-name="about">
            <div class="content">
                <!-- Regular content -->
            </div>
        </section>
    </section>
</neodigm-carousel>
```

## Benefits

✅ **Backward compatible** - No breaking changes (defaults to current behavior)
✅ **Simple API** - Single data attribute with clear, semantic values
✅ **Solves real problems** - Eliminates black space issues for fixed-height pages
✅ **Flexible** - Supports mixed content types within same carousel
✅ **Performance-friendly** - Minimal overhead (simple attribute check on navigation)
✅ **Clean code** - No CSS hacks or workarounds needed

## Testing

We have successfully tested this implementation in production with:
- **Auth flow**: Splash screen → Sign in → Sign out (all `viewport` mode)
- **Admin dashboard**: Tournament management with long forms (`auto` mode)
- **Navigation**: Smooth transitions between different height modes
- **Browser compatibility**: Chrome, Safari, Firefox

Results:
- ✅ Zero black space on auth pages
- ✅ Proper scrolling on dashboard
- ✅ No layout glitches during transitions
- ✅ Existing pages without attribute work as expected

## Fork Information

We have implemented this feature in our fork and would be happy to:

1. **Submit a Pull Request** with the implementation
2. **Provide additional documentation** if needed
3. **Add test cases** to the test suite
4. **Tag a feature branch** for review: `feature/per-page-height-control`

**Fork URL**: [Your GitHub fork URL]
**Branch**: `feature/per-page-height-control`
**Tag**: `v4.1.1-per-page-height` (suggested)

## Files Modified

- `dist/neodigm55__v4_1.js` - Added dynamic height control in `nav()` method (23 lines)
- No CSS changes required
- No breaking changes to existing API

## Additional Notes

This feature aligns with modern web design patterns where developers need granular control over layout behavior without losing the convenience of a carousel component. The implementation is minimal, focused, and follows the existing codebase patterns.

We believe this would benefit the neodigm55 community, particularly developers building:
- Authentication flows
- Mixed content applications
- Landing pages with full-screen sections
- Admin dashboards with varied content lengths

Please let us know if you'd like us to proceed with a formal pull request or if you need any clarification on the implementation.

---

**Contact**:
[Your Name]
[Your Email]
[Your GitHub Username]

**Date**: November 9, 2025
